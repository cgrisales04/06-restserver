require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log("Server corriendo en el pueto: " + port);
});
