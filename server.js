const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiroutes");
const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.use(express.static("public"));

// // GET Route for homepage
// app.get("/", (req, res) => {
//   console.log("Here is a note");
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// // GET Route for feedback page
// app.get("/notes", (req, res) => {
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
//   res.sendFile(path.join(__dirname, "/public/notes.html"));
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);