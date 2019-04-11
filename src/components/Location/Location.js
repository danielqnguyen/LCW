import React from 'react';
import darkSkypApi from './WeatherApi';
const moment = require('moment-timezone');
moment().format();

class InfoInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      lat: "",
      long: "",
      weather: "",
      displayName: "",
      image: "",
    };
  }

  grabWeather = () => darkSkypApi.getWeather(this.state.lat, this.state.long, resp => { this.setState({ weather: resp.data.currently.temperature }, () => this.grabImage()) }, error => { console.log(error) })

  grabImage = () => {
    let weather = this.state.weather;
    if (weather < 30) {
      this.setState({ image: "https://media.tenor.com/images/f37164907671cf76f47e6aedfedf4473/raw" });
    } else if (weather > 30 && weather < 57) {
      this.setState({ image: "https://cdn.vox-cdn.com/thumbor/Ohe6kayr0LpdcUTQLiwSlA8aFX8=/0x0:4154x2716/1200x800/filters:focal(1703x1181:2367x1845)/cdn.vox-cdn.com/uploads/chorus_image/image/63055428/GettyImages_636193958.0.jpg" });
    } else if (weather > 57 && weather < 80) {
      this.setState({ image: "https://www.bloemfonteincourant.co.za/wp-content/uploads/2017/12/warm-weather.jpg" });
    } else if (weather > 80) {
      this.setState({ image: "https://s3.amazonaws.com/lowres.cartoonstock.com/death-hot-hot_day-eternity-dog-locked_in-mban2117_low.jpg" });
    };
  }

  render() {
    if (this.props.data) {
      var lButtons = this.props.data.location.map((item, index) => {
        return <button key={index}
          style={{ backgroundColor: item.button }}
          onClick={() => this.setState({
            location: item.name,
            lat: item.lat,
            long: item.long,
            displayName: item.displayName
          }, () => {
            this.grabWeather()
          })}
          value={item.lat}>
          {item.displayName}
        </button>
      });
    }
    if (this.state.location === "") {
      let current = moment().tz("America/Los_Angeles").format("MMMM Do YYYY, h:mm a");
      return (
        <>
          <div className="info">
            <h1>Hello and welcome to my time and weather app</h1>
            <h2>Currently in Los Angeles, CA it is {current}</h2>
            <h3>To check other timezones and their weather click a button</h3>
          </div>
          {lButtons}
        </>
      );
    } else {
      let current = moment().tz(this.state.location).format("MMMM Do YYYY, h:mm a");
      let cel = (this.state.weather - 32) / 1.8;
      let rCel = Math.ceil(cel * 100) / 100;
      return (
        <>
          <div className="info">
            <h1>Location: {this.state.displayName}</h1>
            <h2>{current}</h2>
            <h2>{this.state.weather}°F / {rCel}°C</h2>
            <div className="image">
              <img src={this.state.image} alt="weather"></img>
            </div>
          </div>
          {lButtons}
        </>
      );
    };
  };
}

export default InfoInput;