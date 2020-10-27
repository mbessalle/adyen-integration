const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios").default;
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

//body parser middleware
app.use(express.json());

app.get("/getClientKey", (_, res) => {
  res.send(process.env.CLIENT_KEY);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
