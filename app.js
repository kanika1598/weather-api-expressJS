const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    const query = req.body.cityName;
    const apiKey = "4698816e8b1c7e8fefb826f8ee0e6d66";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

            res.write("<h1>The Temperature in " + query + " is " + temp + " Celsius</h1>");

            res.write("<h1>The Weather is currently " + description + ".</h1>");

            res.write("<img src=" + iconURL + ">");
            res.send();
        })
    });
})

app.listen(3000, function () {
    //console.log("Hi");
})


