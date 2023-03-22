import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { useEffect, useState } from "react";

type Weather = {
  city: string;
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

type Forecast = {
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

const cities = [
  { name: "Tampere", lat: 61.4991, lon: 23.7871, id: 1 },
  { name: "Jyväskylä", lat: 62.2415, lon: 25.7209, id: 2 },
  { name: "Kuopio", lat: 62.8924, lon: 27.677, id: 3 },
  { name: "Espoo", lat: 60.25, lon: 24.6667, id: 4 },
  { name: "Kaikki kaupungit", lat: 0, lon: 0, id: 5 },
];

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast>({ list: [] });
  const [city, setCity] = useState(cities[0]);
  const [allCitiesWeather, setAllCitiesWeather] = useState<Weather[]>([]);
  const [allCitiesForecast, setAllCitiesForecast] = useState<Forecast[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setErrorMessage("");
    if (city.name === "Kaikki kaupungit") {
      const weatherPromises = cities
        .filter((city) => city.name !== "Kaikki kaupungit")
        .map(({ lat, lon }) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`
          )
            .then((response) => {
              if (!response.ok) {
                handleErrorMessage(response.statusText);
              }
              return response.json();
            })
            .then((data) => data)
        );
      Promise.all(weatherPromises).then((data) => {
        setAllCitiesWeather(
          data.map((weather: any, index) => {
            return {
              ...weather,
              city: cities[index].name,
            };
          })
        );
      });
      const forecastPromises = cities.map(({ lat, lon }) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
          .then((response) => {
            if (!response.ok) {
              handleErrorMessage(response.statusText);
            }
            return response.json();
          })
          .then((data) => data)
      );

      Promise.all(forecastPromises).then((data) => {
        setAllCitiesForecast(data.map((forecast: any) => forecast));
      });
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            handleErrorMessage(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setWeather({
            ...data,
            city: city.name,
          });
        });

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            handleErrorMessage(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setForecast(data);
        });
    }
  }, [city]);

  const handleCityChange = (city: string) => {
    const cityObject = cities.find((cityObject) => cityObject.name === city);
    if (cityObject) {
      setCity(cityObject);
    }
  };

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    console.log(message);
  };

  return (
    <>
      <Header />
      <Dropdown
        city={city.name}
        handleCityChange={handleCityChange}
        cities={cities}
      />
      {errorMessage && <p className="text-center">{errorMessage}</p>}
      {weather?.current &&
        weather?.city &&
        city.name !== "Kaikki kaupungit" && (
          <>
            <WeatherCard {...weather} />
            <ForecastCard {...forecast} />
          </>
        )}

      {city.name === "Kaikki kaupungit" &&
        allCitiesWeather.length > 0 &&
        allCitiesForecast.length > 0 &&
        allCitiesWeather.map(
          (weather, index) =>
            weather && (
              <div key={index}>
                <WeatherCard {...allCitiesWeather[index]} />
                <ForecastCard {...allCitiesForecast[index]} />
              </div>
            )
        )}
    </>
  );
}
export default App;
