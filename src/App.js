import React from "react";
import "./App.css";
import axios from "axios";

const main = async () => {
  let clientKey = await axios.get("/getClientKey");
  // let paymentMethods = axios.post("/paymentMethods", {
  //   value: 1000,
  //   currency: "euro",
  // });
  console.log(clientKey)
};
main();

function App() {
  return <div className="App"></div>;
}

export default App;
