const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const uuid = require("uuid");



const PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes to HTML

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});




app.get("/api/notes", (req, res) => {S
  fs.readfile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  })
});


app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if(err) throw err;
    
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);

    const createNote = Json.stringify(notes);
    fs.writeFile(path.join(__dirname, "./db/db.json"), createNote, (err) => {
      if (err) throw err;
    })
    res.join(newNote);
  });
});

//Delete Saved Notes
app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data); 
    const notesArray = notes.filter(item => {
      return item.id !== noteID
    });

    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err, data) => {
      if (err) throw err;
      res.json(notesArray)
    });
  });
});


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});