import React, { Component } from 'react';
import { OPENWEATHER,OPENWEATHERURL } from '../weatherApis/api';
import WeatherPanel from './WeatherPanel';
import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import NotFound from './NotFound';
import axios from 'axios';
import PropTypes from 'prop-types';
class WeatherSwitch extends Component {
  defaultState = {
    forecastData:{},
    latitude:51.5074,
    longitude:0.1278,
    isCurrent:true,
    isDaily:false,
    isForecast:false,
    error: null,
    loading:true,
    apiRequest:`${OPENWEATHERURL}weather?lat=51.5074&lon=0.1278${OPENWEATHER}`
  }
  constructor(props){
    super(props);
    this.state = this.defaultState;
  }
  updateWeather() {
    this.getLocation();
    this.setState({
      loading:true
    });
    axios.get(this.state.apiRequest)
      .then(res => {
        const city = res.data.city?res.data.city:res.data.name;
        const forecastData = res.data.list?res.data.list:res.data;
        this.setState({
          city,
          forecastData,
          loading:false
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        longitude:position.coords.longitude,
        latitude:position.coords.latitude
      });
      console.log(position.coords.longitude,position.coords.latitude);
    });
  }
  componentWillMount(){
  }
  componentDidMount(){
    this.getLocation();
    this.updateWeather();
  }
  switchForecastType(foreType){
    switch (foreType){
      case 'current':
        this.setState({
          apiRequest:`${OPENWEATHERURL}weather?lat=${this.state.latitude}&lon=${this.state.longitude}${OPENWEATHER}`,
          isCurrent:true,
          isForecast:false,
          isDaily:false,
          loading:true
        },() => this.updateWeather());
        break;
      case 'daily':
        this.setState({
          apiRequest:`${OPENWEATHERURL}forecast/daily?lat=${this.state.latitude}&lon=${this.state.longitude}${OPENWEATHER}`,
          isDaily:true,
          isCurrent:false,
          isForecast:false,
          loading:true
        },() => this.updateWeather());
        break;
      case 'forecast':
        this.setState({
          apiRequest:`${OPENWEATHERURL}forecast?lat=${this.state.latitude}&lon=${this.state.longitude}${OPENWEATHER}`,
          isForecast:true,
          isDaily:false,
          isCurrent:false,
          loading:true
        },() => this.updateWeather());
        break;
      default:
    }
  }
  renderLoading() {
    return (
    <div className="wrapper direction-column s-grid">
      <nav className="main-nav center">
        <ul className="s-grid">
          <li><a className="link-current">Current</a></li>
          <li><a className="link-daily">Daily</a></li>
          <li><a className="forecast"> 5 days / 3 hours</a></li>
        </ul>
      </nav>
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
    )
  }
  render() {
    return (
      <div>{this.state.loading ?
        this.renderLoading()
        : this.renderMain()}
      </div>
    );
  }
  renderMain(){
    let isCurrent = this.state.isCurrent;
    let isDaily = this.state.isDaily;
    let isForecast = this.state.isForecast;
    let Panel = null;
    if (isCurrent){
      Panel = <WeatherCurrent apiData = {this.state.forecastData} city = {this.state.city.name}/>;
    } else if (isDaily) {
      Panel = <WeatherDaily apiData = {this.state.forecastData} city = {this.state.city.name}/>;
    } else if (isForecast){
      Panel = <WeatherPanel apiData = {this.state.forecastData} city = {this.state.city.name}/>;
    } else {
      Panel = <NotFound/>;
    }

    return (
      <div className="s-grid direction-column ">
        <nav className="main-nav">
          <ul className="s-grid">
            <li><a className="link-current" onClick={() => this.switchForecastType('current')}>Current</a></li>
            <li><a className="link-daily" onClick={() => this.switchForecastType('daily')}>Daily</a></li>
            <li><a className="forecast" onClick={() => this.switchForecastType('forecast')}> 5 days / 3 hours</a></li>
          </ul>
        </nav>
        {Panel}
      </div>

  )
  }
}
WeatherSwitch.propTypes = {
  apiData : PropTypes.object,
  city:PropTypes.string
}
export default WeatherSwitch;