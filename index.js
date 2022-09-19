const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Invalid Path",
  });
});
app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}/`);
});
