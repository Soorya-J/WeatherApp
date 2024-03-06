import React, { useRef, useState } from 'react';
import search_icon from '../assets/search_icon.png';
import './weatherApp.css';
import humidity from '../assets/humidity-icon.png';
import wind from '../assets/wind-icon.png';
import yellow_sun from '../assets/yellow-sun-with-rays.png';
import sun_cloud from '../assets/weer-icoon-dag.png';
import sun_cloud_rain from '../assets/day-with-rain.png';
import sun_cloud_rain_tunder from '../assets/day-with-rain_tunder.png';
import sun_cloud_snow from '../assets/day-with-snow.png';
import sun_cloud_rain_two from '../assets/day-with-rain_two.png';
import cloud from '../assets/cloud.png';
import night_one from '../assets/01n.png';
import night_three from '../assets/03n.png';
import night_four from '../assets/04n.png';
import night_nine from '../assets/09n.png';
import night_ten from '../assets/10n.png';
import night_eleven from '../assets/11n.png';
import night_thirteen from '../assets/13n.png';

const WeatherApp = () => {
    const inputref = useRef(null);
    const [wicon, setWicon] = useState(yellow_sun);
    const [weatherData, setWeatherData] = useState({
        temperature: '°C',
        location: '-------',
        humidity: '%',
        windSpeed: 'km/hr'
    });
    const [containerColor, setContainerColor] = useState('linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(43,9,121,1) 35%, rgba(7,53,150,1) 51%, rgba(0,212,255,1) 89%)')

    const Search = async () => {
        const city = inputref.current.value.trim();
        if (!city) {
            alert('Search bar cannot be blank');
            return;
        }

        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
            const response = await fetch(url);
            console.log(response)


            function showAlertError(message) {
                alert(message);
                return false;
            }
            if (!response.ok){
                throw showAlertError('This is not valid');
            }


            const data = await response.json();
            const { main, wind, name, weather } = data;
            
            setWeatherData({
                temperature: Math.floor(main.temp) + "°C",
                location: name,
                humidity: main.humidity + "%",
                windSpeed: wind.speed + " km/hr"
            });

            
            if (weather && weather.length > 0) {
                const icon = weather[0].icon;
                switch (icon) {
                    case '01d':
                        setWicon(yellow_sun);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '02d':
                        setWicon(sun_cloud);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '03d':
                    case '04d':
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        setWicon(cloud);
                        break;
                    case '09d':
                        setWicon(sun_cloud_rain);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '10d':
                        setWicon(sun_cloud_rain_two);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '11d':
                        setWicon(sun_cloud_rain_tunder);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '13d':
                        setWicon(sun_cloud_snow);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '01n':
                    case '02n':
                        setWicon(night_one);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '03n':
                        setWicon(night_three);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '04n':
                        setWicon(night_four);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '09n':
                        setWicon(night_nine);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '10n':
                        setWicon(night_ten);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '11n':
                        setWicon(night_eleven);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '13n':
                        setWicon(night_thirteen);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    default:
                        setWicon(yellow_sun);
                        break;
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="container" style={{background: containerColor}}>
            <div className="top-bar">
                <input type="text" ref={inputref} className="cityInput" placeholder="search" />
                <div className="search-icon" onClick={Search}>
                    <img src={search_icon} alt="search-icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="weather" />
            </div>
            <div className="weather-temp">{weatherData.temperature}</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-containers">
                <div className="element">
                    <img src={humidity} alt="humidity" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="wind" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed}</div>
                        <div className="text">Wind-speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
