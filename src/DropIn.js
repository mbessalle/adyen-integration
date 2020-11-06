import React, { useEffect, useRef } from "react";
import axios from "axios";
import AdyenCheckout from "@adyen/adyen-web";

const DropIn = (props) => {
  const dropin_container_ref = useRef();
  const { setResultCode } = props;

  useEffect(() => {
    const main = async () => {
      console.log("getting client key");
      let clientKey = axios.get("/getClientKey");
      console.log("payment method");
      let paymentMethods = axios.post("/paymentMethods", {
        value: 2000,
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
          console.log("/payments");
          axios
            .post("/payments", state.data)
            .then((response) => {
              if (response.data.action) {
                console.log("handleAction /payments");
                dropin.handleAction(response.data.action);
              } else {
                console.log("showFinalResult /payments");
                console.log(response.data.resultCode);
                setResultCode(response.data.resultCode);
              }
            })
            .catch((error) => {
              console.log("error /payments");
              console.error(error);;
            });
        },
        onAdditionalDetails: (state, dropin) => {
          console.log("/payment/details");
          axios
            .post("/payments/details", state.data)
            .then((response) => {
              if (response.data.action) {
                console.log("handleAction /payments/details");
                dropin.handleAction(response.data.action);
              } else {
                console.log("showFinalResult /payments/details");
                console.log(response.data.resultCode);
                setResultCode(response.data.resultCode);
              }
            })
            .catch((error) => {
              console.log("error /payments/details");
              console.error(error);
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
      checkout.create("dropin").mount(dropin_container_ref.current);
    };
    main();
    console.log("in useEffect");
  }, [setResultCode]);

  return <div ref={dropin_container_ref} id="dropin-container"></div>;
};

export default DropIn;
