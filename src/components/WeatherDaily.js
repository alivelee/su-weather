import React from 'react';
import { unixTimeToDate,convert,getDay } from '../helpers/utils';
import '../styles/weather-icons.min.css';
import '../styles/weather-icons-wind.min.css';
import '../styles/font-awesome/css/font-awesome.min.css';
import '../styles/dailyStyle.css';

const WeatherDaily = (props) =>
  <div className="wrapper">
    <header>
      <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{props.city}</h4>
    </header>
      {props.apiData.map(item =>
      <div key={item.dt} className="card daily-card s-grid direction-column">
        <div className="week daily-week"><h4>{getDay(item.dt)}</h4></div>
        <div className="info-wrapper s-grid">
          <div className="temp s-block">
            <div className="main-temp s-grid direction-column">
              <div><span>{convert(item.temp.day)}</span><i className="wi wi-celsius"></i></div>
              <span className="description">{item.weather[0].description}</span>
            </div>
            <div className="other-temp">
              <span>At Night{convert(item.temp.night)}<i className="wi wi-celsius"></i></span>
              <span>At Morning{convert(item.temp.morn)}<i className="wi wi-celsius"></i></span>
            </div>
            <div className="secondary-temp">
              <span className="s-block">H {convert(item.temp.min)}<i className="wi wi-celsius"></i></span>
              <span className="s-block">L {convert(item.temp.max)}<i className="wi wi-celsius"></i></span>
            </div>
          </div>
          <div className="other-info">
            <i className={'weatherIcon wi wi-owm-' + item.weather[0].id}></i>
            <div className="wind">
              <span>{Math.round(item.speed)} mph<i className={'wi wi-wind-beaufort-' + Math.round(item.speed)}></i></span>
              <i className={'wi wi-wind from-' + item.deg + '-deg'}></i>
            </div>
            <span>Humidity <span>:</span>{item.humidity}<i className="wi wi-humidity"></i></span>
          </div>
        </div>
        </div>

    )}
  </div>



export default WeatherDaily;