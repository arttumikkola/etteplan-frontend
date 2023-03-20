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
    rain: {
      "3h": number;
    };
  }[];
};

function formatTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const ForecastCard = (forecast: ForeCast) => {
  const forecasts = forecast.list.slice(0, 5);
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      {forecasts.map((item, index) => (
        <div
          key={index}
          className="h-34 w-20 border border-border rounded-md flex flex-col items-center justify-center bg-white"
        >
          <div>
            <p className="m-1 text-base text-text">{formatTime(item.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="Weather"
            />
            <p className="text-xl text-text2 m-1">
              {item.main.temp.toFixed(0)} °C
            </p>
          </div>
          <div className="bg-blue min-w-full flex flex-col items-center justify-center">
            <p className="m-px text-sm text-text">
              {item.wind.speed.toFixed(1)} m/s
            </p>
            <p className="m-px text-sm text-text">{item.main.humidity} %</p>
            <p className="m-px text-sm text-text">
              {item.rain?.["3h"] || 0} mm
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
