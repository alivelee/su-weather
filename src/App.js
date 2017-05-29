import React, { Component } from 'react';
import './styles/App.css';
import WeatherSwitch from './components/WeatherSwitch';
class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherSwitch />
      </div>
    );
  }
}

export default App;
