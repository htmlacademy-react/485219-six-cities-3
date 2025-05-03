import {CardProps} from '../../components/offer-card/offer-card-data.ts';
import {AppRoute} from '../../components/utils/routes.ts';
import {Link} from 'react-router-dom';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {CityTabs} from '../../components/city-tabs/city-tabs.tsx';
import {useState} from 'react';
import {CITIES} from '../../components/utils/const.ts';
import {City} from '../../components/utils/const.ts';

type MainPageProps = {
  cardsData: CardProps[];
}

const defaultCity = CITIES[3] as City;

function MainPage({ cardsData }: MainPageProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const selectedCityObj = cardsData.find((card) => card.city.name === selectedCity);

  if (!selectedCityObj) {
    throw new Error('No city selected');
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityTabs cities={CITIES} selectedCity={selectedCity} onCitySelect={setSelectedCity} />
          </section>
        </div>
        <div className="cities">
          <OffersList cardsData={cardsData} selectedCity={selectedCityObj} />
        </div>
      </main>
    </div>
  );
}

export {MainPage};
