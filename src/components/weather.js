import React, {useEffect, useState} from "react";
import axios from "axios";
export default function Weather() {
    const [city, setCity] = useState([])
    const [temperature, setTemperature] = useState([])
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [fetching, setFetching] = useState(true);

    const getTemperature = async () => {
        const temp = await axios(`https://api.openweathermap.org/data/2.5/weather?lang=de&units=metric&lat=${latitude}&lon=${longitude}&appid=48f8ec8fc0d8f080a220eacdf55091f9`);
        if(temp.data.length !== 0) {
            setTemperature(temp.data);
        }
    }

    const getCity = async () => {
        const cityLocation = await axios(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=48f8ec8fc0d8f080a220eacdf55091f9`);
        if(cityLocation.data.length !== 0) {
            setCity(cityLocation.data);
        }

    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setLatitude(52.520008);
            setLongitude(13.404954);
            setFetching(false);

        }
        console.log(latitude)
        console.log(longitude)
    }

    function showPosition(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setFetching(false);

    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                setLatitude(52.520008);
                setLongitude(13.404954);
                setFetching(false);

                break;
            case error.POSITION_UNAVAILABLE:
                setLatitude(52.520008);
                setLongitude(13.404954);
                break;
            case error.TIMEOUT:
                setLatitude(52.520008);
                setLongitude(13.404954);
                break;
            case error.UNKNOWN_ERROR:
                setLatitude(52.520008);
                setLongitude(13.404954);
                break;
        }
    }
    useEffect(()=> {
        getLocation();
    }, [])
    useEffect(()=> {
        getCity();
        getTemperature();
    }, [fetching])
    return (
        <div>
            { city.length > 0 && <div className="p-2 d-flex flex-column flex-sm-row align-items-center justify-content-center weather--container">
                <h5 className="m-0 mx-3 p-0">{city[0].name}</h5>
                <div className="d-flex mx-3 flex-row align-items-center justify-content-center weather--temperature pr-2 pl-4">
                    <h5 className="m-0 p-0 bolder">{Math.round(temperature.main.temp)} °C</h5>
                    <img alt={temperature.weather[0].description} src={`http://openweathermap.org/img/wn/${temperature.weather[0].icon}.png`}  />

                </div>
                <div className="d-flex mx-3 flex-column align-items-start justify-content-center weather--misc">
                    <p className="m-0 p-0">Wind: {temperature.wind.speed} km/h</p>
                    <p className="m-0 p-0">Feuchtigkeit: {temperature.main.humidity}%</p>
                </div>
            </div>
                }
        </div>

    )
}

