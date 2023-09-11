const express = require("express");
const path = require("path");
const requests = require("requests");
const ejs =require("ejs");


const app = express();
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
// console.log(static_path)
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  var cityName = await req.query.city;

  if (cityName == undefined) {
    cityName = "delhi";
  }
  const apikey = "a12f3ffa72e6dbd19d99c8a3b44de733";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;
  requests(url)
    .on("data", function (url) {
      const objData = JSON.parse(url);
      const arrData = [objData];
      console.log(arrData);

      const name = {
        temperature: Math.round(arrData[0].main.temp - 273.15),
        humidity: arrData[0].main.humidity,
        windspeed :  Math.round((arrData[0].wind.speed)* 3.6 )  ,
        description:   arrData[0].weather[0].description,
        country:arrData[0].sys.country,
city:arrData[0].name,
        condition:arrData[0].weather[0].description,
        feel:Math.round(arrData[0].main.feels_like-273.15),
       
        max:Math.round(arrData[0].main.temp_max-273.15),
        min:Math.round(arrData[0].main.temp_min-273.15),
        visiblity:(arrData[0].visibility)/1000,
      };
      res.render("index", { name });
      // const humidity = arrData[0].main.humidity;
      // console.log(temperature);
      // return temperature;
    })

    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);
    });
});

app.listen(8000);
