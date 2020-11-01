import React from "react";
import "./App.css";
import axios from "axios";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import SimpleSelect from "./Form";



const showFinalResult = (response) => {
  console.log("final result");
  console.log(response);
};

const main = async () => {
  let clientKey = axios.get("/getClientKey");
  let paymentMethods = axios.post("/paymentMethods", {
    value: 1000,
    currency: "euro",
  });
  [clientKey, paymentMethods] = await Promise.all([clientKey, paymentMethods]);
  clientKey = clientKey.data;

  const configuration = {
    paymentMethodsResponse: paymentMethods.data,
    clientKey: clientKey,
    locale: "nl-NL",
    environment: "test",
    onSubmit: (state, dropin) => {
      axios
        .post("/payments", state.data)
        .then((response) => {
          if (response.data.action) {
            dropin.handleAction(response.data.action);
          } else {
            // Your function to show the final result to the shopper
            showFinalResult(response);
          }
        })
        .catch((error) => {
          console.error(error)
          // throw Error(error);
        });
    },
    onAdditionalDetails: (state, dropin) => {
      // Your function calling your server to make a `/payments/details` request
      axios
        .post("/payments/details", state.data)
        .then((response) => {
          if (response.data.action) {
            dropin.handleAction(response.data.action);
          } else {
            // Your function to show the final result to the shopper
            showFinalResult(response);
          }
        })
        .catch((error) => {
          throw Error(error);
        });
    },
    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        enableStoreDetails: true,
        hideCVC: false,
        billingAddressRequired: true,
        name: "Credit or debit card",
      },
    },
  };
  const checkout = new AdyenCheckout(configuration);
  checkout.create("dropin").mount("#dropin-container");
};
main();

function App() {
  return (
    <div id="payment-wrapper">
      <SimpleSelect />
      <div id="dropin-container"></div>
    </div>
  );
}

export default App;
