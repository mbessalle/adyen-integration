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

app.post("/payments", (req, res) => {
  const reference = uuidv1();
  axios
    .post(
      "https://checkout-test.adyen.com/v64/payments",
      {
        amount: {
          currency: "EUR",
          value: req.body.value,
        },
        reference: reference,
        paymentMethod: req.body.paymentMethod,
        browserInfo: req.body.browserInfo,
        dateOfBirth: req.body.dateOfBirth,
        shopperReference: req.body.shopperReference,
        shopperName: req.body.shopperName,
        shopperEmail: req.body.shopperEmail,
        channel: "web",
        shopperIP: "localhost",
        deliverAddress: req.body.deliverAddress,
        deviceFingerprint: req.body.deviceFingerprint,
        deliverDate: req.body.deliverDate,
        origin: "https://localhost",
        billingAddress: req.body.billingAddress,
        returnUrl: `http://localhost:3000/${reference}`,
        merchantAccount: process.env.MERCHANT_ACCOUNT,
        additionalData: {
          allow3DS2: true,
        },
      },
      {
        headers: {
          "x-API-key": process.env.API_KEY,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.action.type == "redirect") {
        res.cookie("paymentData", response.data.action.paymentData, {
          sameSite: "none", secure: true,
        });
      }
      res.json(response.data);
    });
});
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
