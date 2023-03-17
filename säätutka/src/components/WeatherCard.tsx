export const WeatherCard = () => {
  return (
    <div className="flex flex-row justify-between m-2">
      <div className="flex flex-col space-y-8">
        <div className="m-2">
          <p className="text-2xl">Espoo</p>
          <p className="text-base text-text">Scattered clouds</p>
        </div>
        <div className="m-2">
          <p className="text-xl">May 2nd</p>
          <p className="text-base text-text">11.53</p>
        </div>
      </div>
      <div className="flex flex-col space-y-10 items-end">
        <div className="flex flex-row">
          <img src="https://openweathermap.org/img/wn/01d.png" alt="Clouds" />
          <p className="text-4xl">0°C</p>
        </div>
        <div className="m-2 flex flex-col items-end">
          <p className="text-text text-base">Wind: 20 m/s</p>
          <p className="text-text text-base">Humidity: 30%</p>
          <p className="text-text text-base">Precipitation (3h): 5 mm</p>
        </div>
      </div>
    </div>
  );
};
