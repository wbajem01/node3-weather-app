const { builtinModules } = require('module');
const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=eac4649f8352c216dbf14989f9c00a3b&units=f&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        uvindex: body.current.uv_index,
      });
    }
  });
};

module.exports = forecast;

/*
const WEATHERSTACK_URL =
  'http://api.weatherstack.com/current?access_key=eac4649f8352c216dbf14989f9c00a3b&units=f&query=New%20York';

request({ url: WEATHERSTACK_URL, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather service!');
  } else if (response.body.error) {
    console.log('Unable to find location!');
  } else {
    // console.log(response.body.current);
    console.log(
      `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees.`
    );
  }
});
*/
