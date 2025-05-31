import {City} from '../utils/const.ts';
import {useAppDispatch} from '../../store';
import {setCity} from '../../store/offers-slice';

type CityTabsProps = {
  cities: readonly City[];
  selectedCity: City;
}

function CityTabs({cities, selectedCity}: CityTabsProps) {
  const dispatch = useAppDispatch();

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
                dispatch(setCity(city));
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
