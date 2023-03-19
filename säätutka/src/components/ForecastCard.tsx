export const ForecastCard = () => {
  return (
    <div className="h-34 w-20 border border-border rounded-md flex flex-col items-center justify-center bg-white">
      <div>
        <p className="m-1 text-base text-text">15:00</p>
        <img src="https://openweathermap.org/img/wn/01d.png" alt="Clouds" />
        <p className="text-xl text-text2 m-1">-1°C</p>
      </div>
      <div className="bg-blue min-w-full flex flex-col items-center justiffy-center">
        <p className="m-px text-sm text-text">2.1 m/s</p>
        <p className="m-px text-sm text-text">5%</p>
        <p className="m-px text-sm text-text">1 mm</p>
      </div>
    </div>
  );
};
