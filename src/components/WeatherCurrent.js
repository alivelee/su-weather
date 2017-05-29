import React from 'react';
import { unixTimeToDate,convertFahrenheit,getDay,getCityName } from '../helpers/utils';
import '../styles/weather-icons.min.css';
import '../styles/weather-icons-wind.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';

const WeatherCurrent = (props) =>

  <section className="wrapper s-grid center direction-column">
    <section className="card s-grid direction-column center">
      <div className="city">
        <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.city}</h4>
      </div>
      <span className="s-block time">{unixTimeToDate(props.apiData.time)}</span>
      <i className={'weatherIcon wi wi-forecast-io-' + props.apiData.icon}></i>
      <span>{convertFahrenheit(props.apiData.temperature)}<i className="wi wi-celsius"></i></span>
      <div className="secondaryTemp center">
        <span className="s-block">Feels like {convertFahrenheit(props.apiData.temperature)}<i className="wi wi-celsius"></i></span>
      </div>
      <span className="mainWeather">{props.apiData.summary}</span>
      <span className="week">{getDay(props.apiData.time)}</span>
      <div className="mainInfo s-block">
        <div className="wind">
          <span><i className={'wind-icon wi wi-wind-beaufort-' + props.apiData.windSpeed}></i>{props.apiData.windSpeed} mph</span>
          <i className={'wi wi-wind from-' + props.apiData.windBearning + '-deg'}></i>
        </div>
      </div>
      <div className="otherInfo s-grid direction-column">
        <span>Humidity <span>:</span> {props.apiData.humidity * 100}<i className="wi wi-humidity"></i></span>
      </div>
    </section>
  </section>

export default WeatherCurrent;