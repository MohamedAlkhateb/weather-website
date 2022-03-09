const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const async = require("hbs/lib/async");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mohamaed Alkhateb",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mohamed Alkhateb",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mohamed Alkhateb",
    helpText: "This is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) return res.send({ error: "You must provide address." });

  geocode(address, (error, data) => {
    if (error) return res.send({ error });

    forecast(data, (error, data) => {
      if (error) return res.send({ error });
      res.send({
        forecast: data.forecastData,
        location: data.location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohamed Alkhateb",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohamed Alkhateb",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on http://localhost:3000.");
});
