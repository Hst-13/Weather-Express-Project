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
    url: `https://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&APPID=${API_KEY}&units=metric&lang=en`,
  };

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      console.log(wobj);

      let main = wobj.main;
      let desc = wobj.weather[0];

      res.render("index", {
        place: wobj.name,
        temperature: main.temp,
        icon: `http://openweathermap.org/img/wn/${desc.icon}@2x.png`,
        desc: desc.main,
        max: main.temp_max,
        min: main.temp_min,
        feels: main.feels_like,
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
    url: `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&APPID=${API_KEY}&units=metric&lang=en`,
  };

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      console.log(wobj);

      let main = wobj.main;
      let desc = wobj.weather[0];

      res.render("index", {
        place: wobj.name,
        temperature: main.temp,
        icon: `http://openweathermap.org/img/wn/${desc.icon}@2x.png`,
        desc: desc.main,
        max: main.temp_max,
        min: main.temp_min,
        feels: main.feels_like,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});
