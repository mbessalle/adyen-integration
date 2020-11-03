import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import SimpleSelect from "./Form";
import DescriptionAlerts from "./Alerts.js";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  useEffect(() => {
    const main = async () => {
      let clientKey = axios.get("/getClientKey");
      let paymentMethods = axios.post("/paymentMethods", {
        value: 1000,
        currency: "euro",
      });
      [clientKey, paymentMethods] = await Promise.all([
        clientKey,
        paymentMethods,
      ]);
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
                showFinalResult(response);
              }
            })
            .catch((error) => {
              console.error(error);
              // throw Error(error);
            });
        },
        onAdditionalDetails: (state, dropin) => {
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
              console.error(error);
              // throw Error(error);
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
  }, []);

  let query = useQuery();
  let details = {
    payload: query.get("payload"),
  };
  if (details.payload !== null) {
    axios.post("/payments/details/", details).then((response) => {
      showFinalResult(response, "response_payload");
    });
  }

  const [resultCode, setResultCode] = useState("");
  const showFinalResult = (response, location_message) => {
    console.log(response);
    console.log(location_message);
    setResultCode(response.data.resultCode);
  };

  return (
    <div id="payment-wrapper">
      <SimpleSelect />
      <DescriptionAlerts resultCode={resultCode} />
      <div id="dropin-container"></div>
    </div>
  );
}

export default App;
