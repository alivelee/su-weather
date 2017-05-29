import React, { Component } from 'react';
import { unixTimeToDate,convert } from '../helpers/utils';
import classNames from 'classnames';
import '../styles/weather-icons.min.css';
import '../styles/weather-icons-wind.min.css';
import '../styles/forecast-style.css';
class WeatherPanel extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let forecast = this.props.apiData;
    console.log(forecast);
    return (
      <section className="wrapper">
        <header>
          <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{this.props.city}</h4>
        </header>
        <div className="fiveDayForecast">
          {forecast.map(item =>
            <div key={item.dt} className="s-grid direction-column vertical-card center">
              <div className="main-info s-block center">
                <span className="s-block time s-grid direction-column">{unixTimeToDate(item.dt)}</span>
                <span><i className={'weather-icon wi wi-owm-' + item.weather[0].id}></i></span>
                <span>{item.weather[0].main}</span>
              </div>
              <div className="s-block">
                <span>{convert(item.main.temp)}<i className="wi wi-celsius"></i></span>
                <div className="other s-block">
                  <span>{item.main.humidity}<i className="wi wi-humidity"></i></span>
                  <div className="wind">
                    <span><i className={'wi wi-wind-beaufort-' + Math.round(item.wind.speed)}></i></span>
                    <span><i className={'wi wi-wind from-' + Math.round(item.wind.deg) + '-deg'}></i></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }
}
export default WeatherPanel;
