import React from 'react'


function HoursForecast({date, icon, iconAlt, temp, windSpeed, windDir, humidity, windDeg}) {
    const dateHandler = date => `${new Date(date).getHours().toString().padStart(2, '0')} : 00`

    return (
        <div className="forecast__item">
            <span className="time span">{dateHandler(date)}</span>
            <img className="img icon" src={icon} alt={iconAlt} title={iconAlt}/>
            <span className="temp span">{temp} &deg;С</span>
            <span className="wind span" title={`${windSpeed} meters per second, ${windDir}`}>
                <img
                    className="img direction"
                    src={process.env.PUBLIC_URL + '/images/arrow-up.png'}
                    alt={`${windDir}, ${windSpeed} mps`}
                    style={{transform: `rotate(${windDeg}deg) scale(-1, -1)`}}
                />
                &nbsp;
                {`${windSpeed} m/s`}
            </span>
            <span className="humidity span" title={`Humidity ${humidity}%`}>
                <img
                    className="img raindrop"
                    src={process.env.PUBLIC_URL + '/images/raindrop.png'}
                    alt="humidity"
                />
                &nbsp;
                {humidity}%
            </span>
        </div>
    )
}


export default HoursForecast