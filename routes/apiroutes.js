const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

// Get request
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Post request
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "Success!",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

// DELETE request
router.delete("/:notes_id", (req, res) => {
  const noteId = req.params.notes_id;
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  then((json) => {
    const result = json.filter((note) => note.notes_id !== noteId);
    writeToFile("./db/db/json", result);
    res.json(`This note has been deleted.`);
  });
});

module.exports = router;
