import React from 'react';
import { unixTimeToDate,convert,getDay } from '../helpers/utils';
import '../styles/weather-icons.min.css';
import '../styles/weather-icons-wind.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';

const WeatherCurrent = (props) =>

  <section className="wrapper s-grid center direction-column">
    <section className="card s-grid direction-column center">
      <div className="city">
        <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.apiData.name}</h4>
      </div>
      <span className="s-block time">{unixTimeToDate(props.apiData.dt)}</span>
      <i className={'weatherIcon wi wi-owm-' + props.apiData.weather[0].id}></i>
      <span>{convert(props.apiData.main.temp)}<i className="wi wi-celsius"></i></span>
      <div className="secondaryTemp center">
        <span className="s-block">H {convert(props.apiData.main.temp_min)}<i className="wi wi-celsius"></i></span>
        <span className="s-block">L {convert(props.apiData.main.temp_max)}<i className="wi wi-celsius"></i></span>
      </div>
      <span className="mainWeather">{props.apiData.weather[0].main}</span>
      <span className="week">{getDay(props.apiData.dt)}</span>
      <div className="mainInfo s-block">
        <div className="wind">
          <span><i className={'wind-icon wi wi-wind-beaufort-' + props.apiData.wind.speed}></i>{props.apiData.wind.speed} mph</span>
          <i className={'wi wi-wind from-' + props.apiData.wind.deg + '-deg'}></i>
        </div>
        <div className="description">
          <span>{props.apiData.weather[0].description}</span>
        </div>
      </div>
      <div className="otherInfo s-grid direction-column">
        <span>Humidity <span>:</span> {props.apiData.main.humidity}<i className="wi wi-humidity"></i></span>
        <span>Sunrise <span>:</span> <i className="wi wi-sunrise"></i>{unixTimeToDate(props.apiData.sys.sunrise)}</span>
        <span>Sunset <span>:</span> <i className="wi wi-sunset"></i>{unixTimeToDate(props.apiData.sys.sunset)}</span>
      </div>
    </section>
  </section>

export default WeatherCurrent;