import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const currency_list = [
  "AED",
  "AUD",
  "BGN",
  "BHD",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "ISK",
  "ILS",
  "INR",
  "JOD",
  "JPY",
  "KRW",
  "KWD",
  "MYR",
  "NOK",
  "NZD",
  "OMR",
  "PLN",
  "QAR",
  "RON",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TWD",
  "USD",
  "ZAR",
];

const country_list = [
  "Austria",
  "Australia",
  "Belgium",
  "Canada",
  "Croatia",
  "Czech Republic",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Netherlands",
  "Poland",
  "Portugal",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Switzerland",
  "United Kingdom (including Isle of Man & Jersey)",
  "United States",
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("USD");
  const [country, setCountry] = React.useState("");

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
        >
          {currency_list.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {country_list.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
    </div>
  );
}
