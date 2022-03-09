const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9oYW1lZGFsa2hhdGViIiwiYSI6ImNrenE1MW5vZzNvZ2MycG5yanFobGdxd2kifQ._nLs1Rz8QBc2FkfbYoxEdA&limit=1`;
  request({ url: url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to conncet to location services!", undefined);
    } else if (!body.features || body.features.length === 0) {
      callback("Unable to find locations. Try another search.", undefined);
    } else {
      const { center, place_name } = body.features[0];
      const [ longitude, latitude ] = center;

      callback(undefined, {
        longitude,
        latitude,
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
