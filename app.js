require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const axios = require("axios").default;

const API_KEY = process.env.API_KEY;

const app = express();
app.set("view engine", "ejs");
app.listen(process.env.PORT || 3000);

app.use(express.static("public"));

app.get("/", (req, res) => {
  let options = {
    method: "GET",
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20Delhi?/today??unitGroup=metric&elements=datetime%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cconditions%2Cicon&include=current&key=${API_KEY}&contentType=json`,
  };

  console.log(options);

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      let current = wobj.currentConditions;
      let day = wobj.days;

      res.render("index", {
        place: wobj.address,
        temperature: current.temp,
        icon: `http://openweathermap.org/img/wn/${current.icon}@2x.png`,
        desc: current.conditions,
        max: day.tempmax,
        min: day.tempmin,
        feels: current.feelslike,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

let wobj = {};

app.get("/city", (req, res) => {
  let options = {
    method: "GET",
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${req.query.city}/today??unitGroup=metric&elements=datetime%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cconditions%2Cicon&include=current&key=${API_KEY}&contentType=json`,
  };

  console.log(options);

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      let current = wobj.currentConditions;
      let day = wobj.days;

      res.render("index", {
        place: wobj.address,
        temperature: current.temp,
        icon: `http://openweathermap.org/img/wn/${current.icon}@2x.png`,
        desc: current.conditions,
        max: day.tempmax,
        min: day.tempmin,
        feels: current.feelslike,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});
