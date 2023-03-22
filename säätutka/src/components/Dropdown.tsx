type Props = {
  city: string;
  handleCityChange: (city: string) => void;
  cities: City[];
};

type City = {
  name: string;
  lat: number;
  lon: number;
};

export const Dropdown = ({ city, handleCityChange, cities }: Props) => {
  return (
    <div className="m-4 bg-white border border-border flex justify-between items-center rounded-md">
      <select
        className="w-full m-2"
        name="city"
        value={city}
        onChange={(event) => handleCityChange(event.target.value)}
      >
        {cities.map((city, index) => (
          <option key={index}>{city.name}</option>
        ))}
      </select>
    </div>
  );
};
