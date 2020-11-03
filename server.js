const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios").default;
require("dotenv").config();
const cookieParser = require("cookie-parser");

//body parser middleware
app.use(express.json());
app.use(cookieParser());

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
      // console.error("error /paymentMethods", error);
    });
});

app.post("/payments", (req, res) => {
  const reference = 'moises_checkoutChallenge';
  axios
    .post(
      "https://checkout-test.adyen.com/v64/payments",
      {
        amount: {
          currency: "EUR",
          value: 1337,
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
        origin: "http://localhost",
        billingAddress: req.body.billingAddress,
        returnUrl: "http://localhost:3000/",
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
      if (response.data.action && response.data.action.type == "redirect") {
        res.cookie("paymentData", response.data.action.paymentData);
      }
      console.log('/payments response server')
      console.log(response.data)
      res.json(response.data);
    })
    .catch((error) => {
      // console.error("error /payments", error);
    });
});

app.post("/payments/details", (req, res) => {
  // console.log("cookies");
  // console.log(req.cookies);
  const body = req.body.details
    ? req.body
    : { details: req.body, paymentData: req.cookies.paymentData };
  axios
    .post("https://checkout-test.adyen.com/v64/payments/details", body, {
      headers: {
        "x-API-key": process.env.API_KEY,
        "content-type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => console.error(error));
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
