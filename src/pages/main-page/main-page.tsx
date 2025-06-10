import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {CityTabs} from '../../components/city-tabs/city-tabs.tsx';
import {CITIES, City} from '../../components/utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchOffers} from '../../store/offers-slice.ts';
import {useEffect} from 'react';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {Header} from '../../components/header/header.tsx';
import {MainEmpty} from '../../components/main-empty/main-empty.tsx';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.offers.city);
  const offers = useAppSelector((state) => state.offers.offers);
  const isLoading = useAppSelector((state) => state.offers.isOffersDataLoading);

  const cityOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const hasOffers = cityOffers.length > 0;

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityTabs cities={CITIES} selectedCity={selectedCity as City} />
          </section>
        </div>

        <div className="cities">
          {hasOffers ? (
            <OffersList selectedCity={cityOffers[0]} />
          ) : (
            <MainEmpty selectedCity={selectedCity as City} />
          )}
        </div>
      </main>
    </div>
  );
}

export {MainPage};
