import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const apiKey = process.env.REACT_APP_API_KEY

    const cityCoordLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    useEffect(() => {
        axios
            .get(cityCoordLink)
            .then(response => {
                const lat = response.data[0].lat
                const lon = response.data[0].lon
                const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                return axios.get(weatherLink)

            })
            .then(response => {
                setWeatherData(response.data)
                setIsLoading(false)
            })
    },[])

    if (isloading) {
        return <div>Loading weahter...</div>
    } else {
        return (
            <div>
                <h2>Weahter in {city}</h2>
                <Temperature temp={weatherData.main.temp} />
                <WeatherIcon icon={weatherData.weather[0].icon} />
                <Wind speed={weatherData.wind.speed} />
            </div>
        )
    }
}

const WeatherIcon = ({ icon }) => {
    const iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <img src={iconLink} alt='weaherIcon' />
    )
}

const Wind = ({ speed }) => {
    return (
        <div>
            wind {speed} m/s
        </div>
    )
}

const Temperature = ({ temp }) => {
    return (
        <div>
            temperature is {temp} celsius
        </div>
    )
}

export default Weather