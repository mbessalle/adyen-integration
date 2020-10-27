const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios").default;
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

app.use(express.json());
