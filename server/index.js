var express = require("express");
var cors = require("cors");
const axios = require("axios");
var app = express();
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/*", (req, res) => {
  const isOnlineApi = req.url.startsWith("/v1") ? false : true;

  const url = isOnlineApi
    ? "https://api.clickup.com"
    : "https://app.clickup.com";
  console.log(url + req.url);

  const headers = isOnlineApi
    ? {
        authorization: process.env.CLICKUP_TOKEN, //the token is a variable which holds the token
      }
    : {
        Cookie: process.env.CLICKUP_COOKIE,
      };
  axios
    .get(url + req.url, {
      headers: headers,
    })
    .then(function (response) {
      res.write(JSON.stringify(response.data, true, 2));
      res.end();
    })
    .catch(function (error) {
      console.log(error);
      res.write(JSON.stringify({ notworking: true }, true, 2));
      res.end();
    });

  //res.send("An alligator approaches!");
});

app.listen(8002, () => console.log("Gator app listening on port 3000!"));
