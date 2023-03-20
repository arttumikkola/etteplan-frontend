type Props = {
  city: string;
  handleCityChange: (city: string) => void;
};

export const Dropdown = ({ city, handleCityChange }: Props) => {
  return (
    <div className="m-4 bg-white border border-border flex justify-between items-center rounded-md">
      <select
        className="w-full m-2"
        name="city"
        value={city}
        onChange={(event) => handleCityChange(event.target.value)}
      >
        <option id="0">Kaikki kaupungit</option>
        <option id="1">Tampere</option>
        <option id="2">Jyväskylä</option>
        <option id="3">Kuopio</option>
        <option id="4">Espoo</option>
      </select>
    </div>
  );
};
