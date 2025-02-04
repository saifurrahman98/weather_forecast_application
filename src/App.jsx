import { useEffect, useState } from 'react';
import './App.css';
import Highlights from './component/Highlights';
import Temprature from './component/Temprature';

function App() {
  const [city, setCity] = useState("Saharanpur"); 
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const apiURL = `http://api.weatherapi.com/v1/current.json?key=a6c958716bf94ad4ad872955240307&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("error"); 
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <>
      <div className='bg-blue-100 h-screen flex justify-center'>
        <div className='mt-40 w-1/5 h-1/3'>
          {weatherData ? (
            <Temprature
              setCity={setCity}
              isCelsius={isCelsius}
              setIsCelsius={setIsCelsius}
              stats={{
                Temp: isCelsius ? weatherData.current.temp_c : weatherData.current.temp_f,
                condition: weatherData.current.condition.text,
                isDay: weatherData.current.is_day,
                location: weatherData.location.name,
                time: weatherData.location.localtime,
              }}
            />
            ) : 
            (
              <p>Loading...</p>
            )
          }
        </div>
        <div className='mt-40 w-1/3 h-1/3 p-13 grid grid-cols-2 gap-6'>
          <h2 className='text-slate-600 text-2xl col-span-2'>Today's Highlights</h2>
          {
          weatherData &&
          (
            <>
               <Highlights
               stats={{
                title:"Wind Status",
                value:weatherData.current.wind_mph,
                unit:"mph",
                direction:weatherData.current.wind_dir
               }}
               />
               <Highlights
               stats={{
                title:"Humidity",
                value:weatherData.current.humidity,
                unit:"%", 
               }}
               />
               <Highlights
               stats={{
                title:"Visiblity",
                value:weatherData.current.vis_miles,
                unit:"miles",
               }}
               />
               <Highlights
               stats={{
                title:"Air Pressure",
                value:weatherData.current.pressure_mb,
                unit:"mb",
               }}
               />
            </>
          )
        }
        </div>
        
      </div>
    </>
  )
}

export default App;
