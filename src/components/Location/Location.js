import React from 'react';
// var moment = require('moment');
const moment = require('moment-timezone');
moment().format();
const weather = require('./WeatherApi');


class InfoInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      lat: "",
      long: "",
      weather: "",
      displayName: ""
    }
  }

  grabWeather = () => {
    weather.getWeather(this.state.lat, this.state.long, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        this.setState({
          weather: weatherResults.temp
        })
      }
    })
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
          value={item.lat}
        >{item.displayName}
        </button>
      }
      )
    }
    if (this.state.location === "") {
      let current = moment().tz("America/Los_Angeles").format("MMMM Do YYYY, h: mm: ss a");
      return (
        <React.Fragment>
          <div>
            <h1>Location: Los Angeles, CA, USA</h1>
            <h2>{current}</h2>
          </div>
          {lButtons}
        </React.Fragment>
      )
    } else {
      let current = moment().tz(this.state.location).format("MMMM Do YYYY, h: mm: ss a");
      return (
        <React.Fragment>
          <div>
            <h1>Location: {this.state.displayName}</h1>
            <h2>{current}</h2>
            <h2>{this.state.weather}</h2>
          </div>
          {lButtons}
        </React.Fragment>
      )
    }
  };
}

export default InfoInput;