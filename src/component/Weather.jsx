import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import cloud from '../assets/cloud.png';
import snow from '../assets/snow.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import wind from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        if (!city) return;

        try {
            const api = '6d0d35fc77d439e202a6a31819b9db30';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });

            setError(null); 
        } catch (error) {
            setError(error.message);
            setWeatherData(null); 
        }
    };

    useEffect(() => {
        search("Delhi"); // Default city
    }, []);

    const handleSearch = () => {
        search(inputRef.current.value);
    };

    return (
        <div className='weather'>
            <div className="search">
                <input ref={inputRef} className="searchinput" type="text" placeholder="Search" />
                <img src={search_icon} alt="Search" onClick={handleSearch} />
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
                    <p className="temperature">{weatherData.temperature}&deg;C</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-data">
    <div className="col">
        <div className="icon-container">
            <img src={humidity} alt="Humidity icon" />
        </div>
        <div className="text-container">
            <span>{weatherData.humidity}</span>
            <span>Humidity</span>
        </div>
    </div>
    <div className="col">
        <div className="icon-container">
            <img src={wind} alt="Wind Speed icon" />
        </div>
        <div className="text-container">
            <span>{weatherData.windSpeed}</span>
            <span>Wind Speed</span>
        </div>
    </div>
</div>

                </>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;
