import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import API from "../API";
import '../styles/TwentyFourHourWeather.css';

//const now = new Date();

const TwentyFourHourForecast = (props) => {
    const result = props.region;
    const [forecastArray, setForecastArray] = useState([]);
    const [forecast, setForecast] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [inputForecast, setInputForecast] = useState([]);
    const [time, setTime] = useState([]);
  
    const currentWeather = async () => {
      const { status, data } = await API.get(
        "/environment/24-hour-weather-forecast"
      );
      const forecastArray = data.items[0].periods;
      const apiForecast = data.items[0].periods[0].regions;
      const inputForecast = data.items[0].periods[0];
      const apiTimestamp = data.items[0].timestamp;
  
      if (status === 200) {
        switch (result) {
          case "north":
            setForecast(apiForecast.north);
            break;
  
          case "south":
            setForecast(apiForecast.south);
            break;
  
          case "east":
            setForecast(apiForecast.east);
            break;
  
          case "west":
            setForecast(apiForecast.west);
            break;
  
          case "central":
            setForecast(apiForecast.central);
            break;
        }
        setForecastArray(forecastArray);
        setTime(apiTimestamp);
        return status;
      }
      setInputForecast(inputForecast);
    };
  
    let text = "morning";
    const forecastList = forecastArray.map((f, i) => {
      if (i < 3) {
        if (i == 0) {
          text = "Morning";
        } else if (i == 1) {
          text = "Afternoon";
        } else if (i == 2) {
          text = "Night";
        }
  
        return (
          <div>
            <h3>{text}</h3>
            <div className="weather-icon-24hr" id={weatherIcon}></div>
            {result}
            <br></br>
            {forecast}
            <br></br>
          </div>
        );
      }
    });
  
    useEffect(() => {
      currentWeather();
      console.log("24hrIcon", weatherIcon);
      console.log("24hrinputforecast", inputForecast);
  
      switch (true) {
        case forecast.includes("Thundery"):
          setWeatherIcon("thunderstorm-24hr");
          break;
        case forecast.includes("Fair"):
          setWeatherIcon("sunny-24hr");
          break;
        case forecast.includes("Cloudy" || "Partly Cloudy (Day)"):
          setWeatherIcon("cloudy-24hr");
          break;
        case forecast.includes("Showers" || "Moderate Rain"):
          setWeatherIcon("showers-24hr");
          break;
        case forecast.includes("Light"):
          setWeatherIcon("light-rain-24hr");
        /* default:
                  weatherIcon = 'sunny-24hr';s
                  break; */
      }
    }, [result, forecast]);
  
    return (
      <>
        <div className="24-hour-container">{forecastList}</div>
      </>
      /*             <div>
              <h3>24-Hour Weather Forecast</h3>
              <div className='weather-icon-24hr' id={weatherIcon}></div>
              <h3>Morning</h3>
              {result}
              <br></br>
              {forecast}
              <br></br>
              </div> */
    );
  };
  
  export default TwentyFourHourForecast;
