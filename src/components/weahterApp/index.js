import './index.css'
import { FaSearchLocation } from 'react-icons/fa'
import { WiHumidity } from "react-icons/wi";
import { PiWindDuotone } from "react-icons/pi";
import { useEffect, useState } from 'react';
import axios from 'axios';
function WeatherApp() {
    const [val, setVal] = useState("")
    const [srch, setSrch] = useState("")
    const [dataGet, setDataGet] = useState(null)
    const [plcholder, setPlcholder] = useState('Search by country name')


    const search = () => {
        setSrch(val)
        setVal("")
    }


    const apiKey = 'b692223aa7c3d6101084e1e18890f526'

    useEffect(() => {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${srch ? srch : "pakistan"}&appid=${apiKey}`)
            .then(response => {
                const jsonData = response.data;
                setDataGet(jsonData);
            })
            .catch(error => {
                console.error('An error occurred:', error);
                setPlcholder("Please enter valid place")

            });
    }, [srch])
    let imgURL = `https://openweathermap.org/img/wn/${dataGet.weather[0].icon}.png`


    return (
        <div className='main_div'>
            <div className='inner_div'>
                <div className='header'>
                    <input type='text' onChange={(e) => { setVal(e.target.value) }} value={val} placeholder={plcholder} id='search' />
                    <button onClick={search}><FaSearchLocation /></button>
                </div>
                <div className='weather_body'>
                    <img id='main-weather-image' src={imgURL} />
                    <h1>{dataGet.name}</h1>
                    <h2 id='temp'>{Math.ceil(dataGet.main.temp - 273.15)}°C</h2>
                    <h5>{dataGet.weather[0].description}</h5>
                    <div className='info-div'>

                        <div>
                            <WiHumidity />
                            <p>Humidity</p>
                            <p>{dataGet.main.humidity}%</p>
                        </div>
                        <div>
                            <PiWindDuotone />
                            <p>wind</p>
                            <p>{dataGet.wind.speed} km/h</p>
                        </div>

                    </div>
                    <div>

                    </div>


                </div> 
            </div>
        </div>
    );
}

export default WeatherApp;