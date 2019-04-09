const request = require('request');
//currently uses request, will change to axios

var getWeather = (lat, long, callback) => {

  request({
    url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/APIKEYHERE/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
      });
    } else {
      callback('Unable to fetch weather');
    };
  })

}

module.exports.getWeather = getWeather;