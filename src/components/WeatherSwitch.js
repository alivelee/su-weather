import React, { Component } from 'react';
import { OPENWEATHER,OPENWEATHERURL } from '../weatherApis/api';
import { DARKSKYAPI, DARKSKYKEY} from '../weatherApis/api';
import { getCityName } from '../helpers/utils';
import WeatherPanel from './WeatherPanel';
import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import NotFound from './NotFound';
import axios from 'axios';
import PropTypes from 'prop-types';
let latitude = null;
let longitude = null;
class WeatherSwitch extends Component {
  defaultState = {
    city:null,
    latitude:null,
    longitude:null,
    currentData:{},
    dailyData:{},
    hourlyData:{},
    allData:{},
    isCurrent:true,
    isDaily:false,
    isForecast:false,
    error: null,
    loading:true,
  }
  constructor(props){
    super(props);
    this.state = this.defaultState;
  }
  updateWeather() {
    this.setState({
      loading:true
    });
    axios.get(`${DARKSKYAPI}${DARKSKYKEY}/${this.state.latitude},${this.state.longitude}`)
      .then(res => {
        // const city = res.data.city?res.data.city:res.data.name;
        // const city = (res.data.timezone);
        const currentData = res.data.currently;
        const dailyData = res.data.daily;
        const hourlyData = res.data.hourly;
        const allData = res.data
        this.setState({
          // city,
          currentData,
          dailyData,
          hourlyData,
          allData,
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
      },() => this.updateWeather());
      console.log(position.coords.longitude,position.coords.latitude);
      let map = new window.BMap.Map("allmap");
      let point = new window.BMap.Point(this.state.longitude,this.state.latitude);
      let geoc = new window.BMap.Geocoder();
      geoc.getLocation(point,rs => {
        let addComp = rs.addressComponents;
        this.setState({
          city:addComp.city
        });
        console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
    });
  });
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.getLocation();
  }
  switchForecastType(foreType){
    switch (foreType){
      case 'current':
        this.setState({
          isCurrent:true,
          isForecast:false,
          isDaily:false,
          loading:false
        });
        break;
      case 'daily':
        this.setState({
          isDaily:true,
          isCurrent:false,
          isForecast:false,
          loading:false
        });
        break;
      case 'forecast':
        this.setState({
          isForecast:true,
          isDaily:false,
          isCurrent:false,
          loading:false
        });
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
          <li><a className="forecast">Hourly</a></li>
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
      Panel = <WeatherCurrent apiData = {this.state.currentData} city = {this.state.city}/>;
    } else if (isDaily) {
      Panel = <WeatherDaily apiData = {this.state.dailyData} city = {this.state.city}/>;
    } else if (isForecast){
      Panel = <WeatherPanel apiData = {this.state.hourlyData} city = {this.state.city}/>;
    } else {
      Panel = <NotFound/>;
    }

    return (
      <div className="s-grid direction-column ">
        <nav className="main-nav">
          <ul className="s-grid">
            <li><a className="link-current" onClick={() => this.switchForecastType('current')}>Current</a></li>
            <li><a className="link-daily" onClick={() => this.switchForecastType('daily')}>Daily</a></li>
            <li><a className="forecast" onClick={() => this.switchForecastType('forecast')}>Hourly</a></li>
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