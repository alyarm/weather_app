import React, {useState, useEffect} from 'react'
import DayTab from './DayTab'
import HoursForecast from './HoursForecast'
import SearchForm from './SearchForm'

function App() {

  const api = {
    base: 'http://api.weatherapi.com/v1/',
    key: '8bf59cde664a44a58f1132030212609'
  }
  
  const [status, setStatus] = useState({
    searchResponseStatus: 0,
    weatherResponseStatus: 0
  })
  const [daysCount, setDaysCount] = useState(7)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResponse, setSearchResponse] = useState([])
  const [selectedCityURL, setSelectedCityURL] = useState('')
  const [weatherResponse, setWeatherResponse] = useState({})
  const [selectedDay, setSelectedDay] = useState(0)

  //update prompt of cities by input
  useEffect(() => {
    fetch(`${api.base}search.json?key=${api.key}&lang=ru&q=${stringToURL(searchQuery)}}`, {method: 'GET'})
    .then(res => {
      setStatus({...status, searchResponseStatus: res.status})
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      } else {
        throw new Error(`Status code: ${res.status}, ${res.statusText}`)
      }
    })
    .then(res => setSearchResponse([...res]))
    .catch(error => console.log(error))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  //search weather forecast by ip
  useEffect(() => {
    fetch(`${api.base}forecast.json?key=${api.key}&days=${daysCount}&q=auto:ip`, {method: 'GET'})
      .then(res => {
        setStatus({...status, weatherResponseStatus: res.status})
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        } else {
          throw new Error(`Status code: ${res.status}, ${res.statusText}`)
        }
      })
      .then(res => {
        setWeatherResponse({...res})
        setSelectedDay(0)
      })
      .catch(error => console.log(error))

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //search weather forecast
  useEffect(() => {
    if (selectedCityURL.length > 0) {
      fetch(`${api.base}forecast.json?key=${api.key}&days=${daysCount}&q=${selectedCityURL}}`, {method: 'GET'})
      .then(res => {
        setStatus({...status, weatherResponseStatus: res.status})
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        } else {
          throw new Error(`Status code: ${res.status}, ${res.statusText}`)
        }
      })
      .then(res => {
        setWeatherResponse({...res})
        setSelectedDay(0)
      })
      .catch(error => console.log(error))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityURL])

  
  const stringToURL = (str) => {
    const newStr = str.replace(/^\s+/g, '').replace(/\s+/g, ' ').split(' ').join('+')
    return newStr[newStr.length - 1] === '+' ? `${newStr}%` : newStr
  }

  const tempHandler = temp => temp > 0 ? `+${temp}` : temp
  

  return (
    <div className="app">
      <header className="header container">
        <h1 className="title">Weather</h1>
      </header>
      <main className="main container">

        <SearchForm
          setSearchQuery={setSearchQuery}
          searchResponse={searchResponse}
          setSelectedCityURL={setSelectedCityURL}
          setSearchResponse={setSearchResponse}
        />

        {status.weatherResponseStatus >= 200 && status.weatherResponseStatus < 300 && weatherResponse.location !== undefined
          ? <div className="location">{`${weatherResponse.location.name}, ${weatherResponse.location.country}`}</div>
          : false
        }

        {status.weatherResponseStatus >= 200 && status.weatherResponseStatus < 300 && weatherResponse.forecast !== undefined
          ? <div className="weather">
              <div className="tabs">
                {weatherResponse.forecast.forecastday.map((item, index)=> {
                    return <DayTab
                      key={item.date_epoch}
                      daysCount={weatherResponse.forecast.forecastday.length}
                      date={item.date}
                      icon={item.day.condition.icon}
                      iconAlt={item.day.condition.text}
                      minTemp={tempHandler(item.day.mintemp_c)}
                      maxTemp={tempHandler(item.day.maxtemp_c)}
                      isSelected={index === selectedDay}
                      onClick={()=> index !== selectedDay && setSelectedDay(index)}
                    />
                  })
                }
              </div>

              <div className="detailed">
                <div className="detailed__forecast forecast">
                  {weatherResponse.forecast.forecastday[selectedDay].hour.filter((item, i) => i % 3 === 0).map((item, index) => {
                      return <HoursForecast 
                        key={`${index}${item.date_epoch}`}
                        date={item.time}
                        icon={item.condition.icon}
                        iconAlt={item.condition.text}
                        temp={tempHandler(item.temp_c)}
                        windSpeed={(item.wind_kph / 3.6).toFixed(1)}
                        windDir={item.wind_dir}
                        windDeg={item.wind_degree}
                        humidity={item.humidity}
                      />
                    })
                  }
                </div>
              </div>
            </div>
          : 'Loading...'
        }

      </main>
    </div>
  )
}

export default App;