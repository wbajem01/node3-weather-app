const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2NzMjM0MCIsImEiOiJja3k2cXp2OTAweXA2MnVvMHdsdW9lcTk1In0.clPrDFDc6AZOHS6YpUW07A&limit=1'`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search');
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].geometry.coordinates[0],
        longitude: body.features[0].geometry.coordinates[1],
      });
    }
  });
};

module.exports = geocode;

/*
const MAPBOX_URL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/canberra.json?access_token=pk.eyJ1IjoiY2NzMjM0MCIsImEiOiJja3k2cXp2OTAweXA2MnVvMHdsdW9lcTk1In0.clPrDFDc6AZOHS6YpUW07A&limit=1';

request({ url: MAPBOX_URL, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to map service!');
  } else if (response.body.message) {
    console.log('Unable to find location!');
  } else {
    const location = response.body.features[0].place_name;
    const latitude = response.body.features[0].geometry.coordinates[1];
    const longitude = response.body.features[0].geometry.coordinates[0];
    console.log(`Location: ${location}`);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
});
*/
