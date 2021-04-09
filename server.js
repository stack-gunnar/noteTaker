const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const uuid = require("uuid");



const PORT = process.env.PORT || 3000;

let Notes = require("./Develop/db/db.json");

app.use(express.static( "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes to HTML

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});




app.get("/api/notes", (req, res) => {
  res.json(Notes);
});
  

    
    
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id =uuid();
  Notes.push(newNote);
  res.json(newNote);
  fs.writeFile("db.db.json", JSON.stringify(Notes), err => { if (err) { throw err;} return true;});
});






app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  for(var i = 0; 1 < Notes.length; i++) {
    if (id === Notes[i].id) {
      Notes.splice(i, 1);
      fs.writeFile("db/db.json", JSON.stringify(Notes), err => {if (err){throw err;} return true; });
    }
  };
  res.json(Notes);
});






app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});