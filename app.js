const express = require('express');
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res)=> {
  const query = req.body.cityName;
  const apiKey = "672d74be94a1b0f30d72b0c19b62e215"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<p>The temperature in ${query} is ${temp} + degrees Celcuis.<p>`);
      res.write(`<h1>The weather is currently ${description}.</h1>`);
      res.write(`<img src=${imageURL}>`)
      res.send();
    });
  });
})

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

