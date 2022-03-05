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
  // Required parameters
  if (title && text) {
    // Variable for the note to save
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

module.exports = router;
