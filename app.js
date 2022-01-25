const express = require("express");
const ejs = require("ejs");
const axios = require("axios").default;

const app = express();
app.set("view engine", "ejs");
app.listen(process.env.PORT || 3000);

app.use(express.static("public"));

app.get("/", (req, res) => {
  let options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: { q: "New Delhi", lang: "en", units: "metric" },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "0188c43979msh2e9a8d8e9d2ebe9p142e88jsn8b181cebbf95",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      let main = wobj.main;
      let desc = wobj.weather;

      res.render("index", {
        place: wobj.name,
        temperature: main.temp,
        icon: `http://openweathermap.org/img/wn/${desc[0].icon}@2x.png`,
        desc: desc[0].main,
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
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: { q: `${req.query.city}`, lang: "en", units: "metric" },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "0188c43979msh2e9a8d8e9d2ebe9p142e88jsn8b181cebbf95",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      wobj = response.data;

      let main = wobj.main;
      let desc = wobj.weather;

      res.render("index", {
        place: wobj.name,
        temperature: main.temp,
        icon: `http://openweathermap.org/img/wn/${desc[0].icon}@2x.png`,
        desc: desc[0].main,
        max: main.temp_max,
        min: main.temp_min,
        feels: main.feels_like,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});
