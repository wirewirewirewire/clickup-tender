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
  console.log(req.url, req.params[0]);
  axios
    .get("https://api.clickup.com" + req.url, {
      headers: {
        authorization: process.env.CLICKUP_TOKEN, //the token is a variable which holds the token
      },
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
