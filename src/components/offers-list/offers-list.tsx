import {CardProps} from '../offer-card/offer-card-data.ts';
import {OfferCard} from '../offer-card/offer-card.tsx';
import {memo, useCallback, useMemo, useState} from 'react';
import {Map} from '../map/map.tsx';
import {useAppSelector} from '../../store';

type SortOption = {
  value: string;
  isActive: boolean;
};

type SortOptions = SortOption[];

const initialSortOptions: SortOptions = [
  {
    value: 'Popular',
    isActive: true
  },
  {
    value: 'Price: low to high',
    isActive: false
  },
  {
    value: 'Price: high to low',
    isActive: false
  },
  {
    value: 'Top rated first',
    isActive: false
  }
];

const SortOptionComponent = ({option, onClick}: { option: SortOption; onClick: () => void }) => (
  <li className={`places__option ${option.isActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={onClick}>
    {option.value}
  </li>
);
const SortOption = memo(SortOptionComponent);
SortOption.displayName = 'SortOption';

type OffersListProps = {
  selectedCity: CardProps;
};

const OffersListComponent = ({selectedCity}: OffersListProps): JSX.Element => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [options, setOptions] = useState<SortOptions>(initialSortOptions);

  const offers = useAppSelector((state) => state.offers.offers);

  const currentOffers = useMemo(() =>
    offers.filter((offer) => offer.city.name === selectedCity.city.name), [offers, selectedCity]);

  const activeSortType = useMemo(() =>
    options.find((option) => option.isActive)?.value || 'Popular', [options]);

  const sortedOffers = useMemo(() => {
    if (!currentOffers.length) {
      return [];
    }

    switch (activeSortType) {
      case 'Price: low to high':
        return [...currentOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...currentOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...currentOffers].sort((a, b) => b.rating - a.rating);
      default:
        return currentOffers;
    }
  }, [currentOffers, activeSortType]);

  const handleOptionClick = useCallback((clickedValue: string) => {
    setOptions((prev) => prev.map((opt) => ({...opt, isActive: opt.value === clickedValue})));
    setIsSortOpen(false);
  }, []);

  const handleCardHover = useCallback((id: string) => setActiveCardId(id), []);
  const handleCardLeave = useCallback(() => setActiveCardId(null), []);

  const sortOptionHandlers = useMemo(() =>
    options.reduce((acc, option) => {
      acc[option.value] = () => handleOptionClick(option.value);
      return acc;
    }, {} as Record<string, () => void>), [options, handleOptionClick]);

  return (
    <div className="cities__places-container container">
      {sortedOffers.length > 0 ? (
        <>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {sortedOffers.length} places to stay in {selectedCity.city.name}
            </b>

            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span
                className="places__sorting-type"
                tabIndex={0}
                onClick={() => setIsSortOpen((state) => !state)}
              >
                {activeSortType}
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className={`places__options places__options--custom ${isSortOpen && 'places__options--opened'}`}>
                {options.map((option) => (
                  <SortOption
                    key={option.value}
                    option={option}
                    onClick={sortOptionHandlers[option.value]}
                  />
                ))}
              </ul>
            </form>

            <div className="cities__places-list places__list tabs__content">
              {sortedOffers.map((card) => (
                <OfferCard
                  key={card.id}
                  card={card}
                  block="cities"
                  onMouseEnter={() => handleCardHover(card.id)}
                  onMouseLeave={handleCardLeave}
                />
              ))}
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              className="cities__map"
              selectedCity={selectedCity}
              cardsData={sortedOffers}
              activeOfferId={activeCardId}
            />
          </div>
        </>
      ) : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">No places to stay available</b>
        </section>
      )}
    </div>
  );
};

const OffersList = memo(OffersListComponent);
OffersList.displayName = 'OffersList';

export {OffersList};
