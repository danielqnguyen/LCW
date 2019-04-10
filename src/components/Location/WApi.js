import axios from 'axios';

class darkSkyApi{
  static getWeather(lat, long, onSuccess, onError) {
  axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/APIKEYHERE/${lat},${long}`)
    .then(onSuccess)
    .catch(onError);
  }
}

export default darkSkyApi;