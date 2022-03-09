const request = require("request");

const key = "8bdf4e9007c1ffae245275bbd3020d7a";

const forecast = ({ longitude: lon, latitude: lat }, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&&lon=${lon}&&appid=${key}&&units=metric`;
  request({ url, json: true }, (err, { body }) => {
    if (err) callback("Cannot connect to url!", undefined);
    else if (!body.main || !body.weather[0].main) {
      callback(body.message, undefined);
    } else {
      callback(undefined, {
        forecastData: `${body.weather[0].main}. It's currently ${body.main.temp} degree out.`,
        location: body.name,
      });
    }
  });
};

module.exports = forecast;
