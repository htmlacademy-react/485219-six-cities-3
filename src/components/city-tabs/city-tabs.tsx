import {City} from '../utils/const.ts';

type CityTabsProps = {
  cities: readonly City[];
  selectedCity: City;
  onCitySelect: (city: City) => void;
}

function CityTabs({cities, selectedCity, onCitySelect}: CityTabsProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();

              if (selectedCity !== city) {
                onCitySelect(city);
              }
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export {CityTabs};
