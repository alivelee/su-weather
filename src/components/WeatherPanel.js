import React, { Component } from 'react';
import { unixTimeToDate,convertFahrenheit} from '../helpers/utils';
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
          {forecast.data.map(item =>
            <div key={item.time} className="s-grid direction-column vertical-card center">
              <div className="main-info s-block center">
                <span className="s-block time s-grid direction-column">{unixTimeToDate(item.time)}</span>
                <div><i className={'weather-icon wi wi-forecast-io-' + item.icon}></i></div>
                <div>{item.summary}</div>
              </div>
              <div className="s-block other-info">
                <span>{convertFahrenheit(item.temperature)}<i className="wi wi-celsius"></i></span>
                <div className="other s-block">
                  <span>{item.humidity * 100}<i className="wi wi-humidity"></i></span>
                  <div className="wind">
                    <span><i className={'wi wi-wind-beaufort-' + Math.round(item.windSpeed)}></i></span>
                    <span><i className={'wi wi-wind from-' + Math.round(item.windBearing) + '-deg'}></i></span>
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
