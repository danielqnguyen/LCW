import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Location from './components/Location/Location';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {}
    };
  }

  getLocationData() {
    $.ajax({
      url: '/locationData.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ locationData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getLocationData();
  }

  render() {
    return (
      <div className="App">
        <Location data={this.state.locationData.main} />
      </div>
    );
  };
}

export default App;
