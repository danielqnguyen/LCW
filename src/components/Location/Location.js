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
    }
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val }, console.log(key, val));
  }

  onClick = () => {
    console.log(this.state)
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

  onLA = () => {
    this.setState({
      location: "America/Los_Angeles",
      lat: "34.05",
      long: "-118.24"
    }, () => {
      this.grabWeather()
    })
  }

  onKR = () => {
    this.setState({
      location: "Asia/Seoul",
      lat: "37.34",
      long: "126.59"
    }, () => {
      this.grabWeather()
    })
  }

  render() {
    if (this.state.location === "") {
      let current = moment().tz("America/Los_Angeles").format("MMMM Do YYYY, h: mm: ss a");
      return (
        <React.Fragment>
          <div>
            <h1>Location: America/Los_Angeles</h1>
            <h2>{current}</h2>
          </div>
          <button onClick={this.onLA}>Los Angeles</button>
          <button onClick={this.onKR}>Seoul</button>
        </React.Fragment>
      )
    } else {
      let current = moment().tz(this.state.location).format("MMMM Do YYYY, h: mm: ss a");
      return (
        <React.Fragment>
          <div>
            <h1>Location: {this.state.location}</h1>
            <h2>{current}</h2>
            <h2>{this.state.weather}</h2>
          </div>
          <button onClick={this.onLA}>Los Angeles</button>
          <button onClick={this.onKR}>Seoul</button>
        </React.Fragment>
      )
    }
  };
}


export default InfoInput;