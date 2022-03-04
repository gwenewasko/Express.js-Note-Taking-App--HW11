const fb = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// Get request
fb.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Post request
fb.post("/notes", (req, res) => {
  const { title, text } = req.body;
  console.log("title", title);
  console.log("text", text);
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

module.exports = fb;
