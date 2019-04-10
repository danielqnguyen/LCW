import React from 'react';
import darkSkypApi from './WeatherApi'
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
      displayName: ""
    };
  }

  grabWeather = () => darkSkypApi.getWeather(this.state.lat, this.state.long, resp => {this.setState({ weather: resp.data.currently.temperature })}, error => {console.log(error)})

  
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
      })
    }
    if (this.state.location === "") {
      let current = moment().tz("America/Los_Angeles").format("MMMM Do YYYY, h:mm a");
      return (
        <>
          <div>
            <h1>Location: Los Angeles, CA, USA</h1>
            <h2>{current}</h2>
          </div>
          {lButtons}
        </>
      )
    } else {
      let current = moment().tz(this.state.location).format("MMMM Do YYYY, h:mm a");
      return (
        <>
          <div>
            <h1>Location: {this.state.displayName}</h1>
            <h2>{current}</h2>
            <h2>{this.state.weather}</h2>
          </div>
          {lButtons}
        </>
      )
    }
  };
}

export default InfoInput;