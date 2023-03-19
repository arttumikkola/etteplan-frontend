import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { useEffect, useState } from "react";

// 289126ef1b80a9dd3fd33c17f6d4035a
// 24392cbec8b2d93a94b2e5a23018dfad

type Weather = {
  lat: number;
  lon: number;
  current: {
    dt: number;
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
};

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  var lat = 61.4991;
  var lon = 23.7871;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=289126ef1b80a9dd3fd33c17f6d403`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, [lat, lon]);

  if (weather !== undefined) {
    return (
      <div className="">
        <Header />
        <Dropdown />
        {weather && <WeatherCard {...weather} />}
        <div className="flex flex-row items-center justify-center space-x-1">
          <ForecastCard />
          <ForecastCard />
          <ForecastCard />
          <ForecastCard />
          <ForecastCard />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
