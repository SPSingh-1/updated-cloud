const connectToMongo = require("./db");
var cors = require('cors')
const express = require("express");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Hello Shashi");
});

app.listen(port, () => {
  console.log(`My-Cloud backend listening at port http://localhost:${port}`);
});
