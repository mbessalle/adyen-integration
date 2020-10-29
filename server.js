const { response } = require("express");
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

app.post("/paymentMethods", (req, res) => {
  axios
    .post(
      "https://checkout-test.adyen.com/v64/paymentMethods",
      {
        merchantAccount: process.env.MERCHANT_ACCOUNT,
        countryCode: "NL",
        amount: {
          currency: "EUR",
          value: req.body.value,
        },
        channel: "Web",
        shopperLocale: "nl-NL",
      },
      {
        headers: {
          "x-API-key": process.env.API_KEY,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("error 1", error);
    });
});
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
