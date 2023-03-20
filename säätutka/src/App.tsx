import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { useEffect, useState } from "react";

type Weather = {
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
  daily: {
    rain: number;
  }[];
};

type ForeCast = {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    pop: number;
    rain: {
      "3h": number;
    };
  }[];
};

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForeCast>({ list: [] });
  const [city, setCity] = useState("Kaikki kaupungit");
  const [lat, setLat] = useState(61.4991);
  const [lon, setLon] = useState(23.7871);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setCoordinates(city);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      });
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecast(data);
        console.log(data);
      });
  }, [lat, lon]);

  const handleCityChange = (city: string) => {
    setCity(city);
    console.log(city);
  };

  const setCoordinates = (city: string) => {
    var treLat = 61.4991;
    var treLon = 23.7871;
    var jklLat = 62.2415;
    var jklLon = 25.7209;
    var kuoLat = 62.8924;
    var kuoLon = 27.677;
    var espLat = 60.25;
    var espLon = 24.6667;

    if (city === "Tampere") {
      setLat(treLat);
      setLon(treLon);
    } else if (city === "Jyväskylä") {
      setLat(jklLat);
      setLon(jklLon);
    } else if (city === "Kuopio") {
      setLat(kuoLat);
      setLon(kuoLon);
    } else if (city === "Espoo") {
      setLat(espLat);
      setLon(espLon);
    } else {
      setLat(treLat);
      setLon(treLon);
    }
  };

  if (!weather || !forecast) return <div>Loading...</div>;
  else {
    return (
      <div className="">
        <Header />
        <Dropdown city={city} handleCityChange={handleCityChange} />
        {weather && <WeatherCard {...weather} />}
        {<ForecastCard {...forecast} />}
      </div>
    );
  }
}

export default App;
