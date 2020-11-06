import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DescriptionAlerts from "./Alerts.js";
import DropIn from "./DropIn";
import "@adyen/adyen-web/dist/adyen.css";
import "./App.css";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  let query = useQuery();
  let details = {
    payload: query.get("payload"),
  };
  if (details.payload !== null) {
    axios.post("/payments/details/", details).then((response) => {
      showFinalResult(response);
    });
  }

  const [resultCode, setResultCode] = useState("");
  const showFinalResult = (response) => {
    console.log(`in showFinalResult: ${response.data.resultCode}`);
    setResultCode(response.data.resultCode);
  };

  return (
    <div className="payment-wrapper">
      <DescriptionAlerts
        resultCode={resultCode}
        setResultCode={setResultCode}
      />
      <DropIn setResultCode={setResultCode} />
    </div>
  );
}

export default App;
