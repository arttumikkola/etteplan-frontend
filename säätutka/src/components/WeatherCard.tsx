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

export const WeatherCard = (weather: Weather) => {
  const now = new Date();
  const currentTime =
    now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

  function getDayWithSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  const dayOfMonth = getDayWithSuffix(now.getDate());
  const monthName = now.toLocaleString("en-US", { month: "long" });
  const formattedDate = `${monthName} ${dayOfMonth}`;

  return (
    <div className="m-4 border border-border rounded-md flex flex-row justify-between bg-white">
      <div className="flex flex-col space-y-8">
        <div className="m-2">
          <p className="text-2xl">{weather.city}</p>
          <p className="text-base text-text">
            {weather.current.weather[0].description}
          </p>
        </div>
        <div className="m-2">
          <p className="text-xl">{formattedDate}</p>
          <p className="text-base text-text">{currentTime}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-10 items-end m-2">
        <div className="flex flex-row">
          <img
            src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`}
          />
          <p className="text-4xl">{weather.current.temp.toFixed(0)}°C</p>
        </div>
        <div className="m-2 flex flex-col items-end">
          <p className="text-text text-base">
            Wind: {weather.current.wind_speed.toFixed(1)} m/s
          </p>
          <p className="text-text text-base">
            Humidity: {weather.current.humidity} %
          </p>
          <p className="text-text text-base">
            Precipitation (3h): {weather.daily[0].rain.toFixed(1)} mm
          </p>
        </div>
      </div>
    </div>
  );
};
