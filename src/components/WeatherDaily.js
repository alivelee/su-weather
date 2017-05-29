import React from 'react';
import { unixTimeToDate,convertFahrenheit,getDay } from '../helpers/utils';
import '../styles/weather-icons.min.css';
import '../styles/weather-icons-wind.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/dailyStyle.css';
const WeatherDaily = (props) =>
  <div className="wrapper">
    <header>
      <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.city}</h4>
    </header>
      {props.apiData.data.map(item =>
      <div key={item.dt} className="card daily-card s-grid direction-column">
        <div className="week daily-week"><h4>{getDay(item.time)}</h4></div>
        <div className="info-wrapper s-grid">
          <div className="temp s-block">
            <div className="main-temp s-grid direction-column">
              <div className="secondary-temp">
                <span className="s-block">H {convertFahrenheit(item.temperatureMax)}<i className="wi wi-celsius"></i></span>
                <span className="s-block">L {convertFahrenheit(item.temperatureMin)}<i className="wi wi-celsius"></i></span>
              </div>
              <span className="description">{item.summary}</span>
              <div className="sunrise">
                <span>Sunrise: {unixTimeToDate(item.sunriseTime)}</span>
                <span>Sunset: {unixTimeToDate(item.sunsetTime)}</span>
              </div>
              <div className="windy">
                <span>{Math.round(item.windSpeed)} mph<i className={'wi wi-wind-beaufort-' + Math.round(item.windSpeed)}></i></span>
                <span>Humidity <span>:</span>{item.humidity * 100}<i className="wi wi-humidity"></i></span>
              </div>
            </div>
          </div>
          <div className="other-info">
            <i className={'weatherIcon wi wi-forecast-io-' + item.icon}></i>
          </div>
        </div>
        </div>

    )}
  </div>



export default WeatherDaily;