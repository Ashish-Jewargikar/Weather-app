import React, { useState, useEffect } from "react";
import "./Style.css";
import searchh from "./Assets/search.png";
import humidity from "./Assets/humidity.png";
import wind from "./Assets/wind.png";
import cloud_icon from "./Assets/cloud.png";
import storm_icon from "./Assets/storm.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import clear_icon from "./Assets/clear.png";
import drizzle_icon from "./Assets/drizzle.png";
import contrast from "./Assets/contrast.png";

const Weather = () => {
  const api_key = "5b68b73c0b9db3261ec76e33bfe9ce79";

  const [wicon, setWicon] = useState(contrast);
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
  });

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value.trim() === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        const { main, wind, name, weather } = data;
        setWeatherData({
          humidity: `${main.humidity} %`,
          windSpeed: `${wind.speed} km/h`,
          temperature: `${main.temp} °C`,
          location: name,
        });
        updateWeatherIcon(weather[0].icon);
      } else {
        console.error("Error fetching weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const updateWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
        setWicon(rain_icon);
        break;
      case "11d":
      case "11n":
        setWicon(storm_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(clear_icon);
        break;
    }
  };

  useEffect(() => {
    // Fetch initial weather data for a default location if needed
    // Example: search();
    const defaultLocation = "Gulbarga";
    document.getElementsByClassName("cityInput")[0].value = defaultLocation;
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />

          <div className="search-icon" onClick={search}>
            <img src={searchh} alt="search" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">{weatherData.temperature}</div>
        <div className="weather-location">{weatherData.location}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="humidity" className="icon" />
            <div className="data">
              <div className="humidity-percentage">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="wind" className="icon" />
            <div className="data">
              <div className="wind-rate">{weatherData.windSpeed}</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
