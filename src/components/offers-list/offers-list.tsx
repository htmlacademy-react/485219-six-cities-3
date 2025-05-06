import {CardProps} from '../offer-card/offer-card-data.ts';
import {OfferCard} from '../offer-card/offer-card.tsx';
import {useState} from 'react';
import {Map} from '../map/map.tsx';

type OffersListProps = {
  cardsData: CardProps[];
  selectedCity: CardProps;
}

function OffersList({ cardsData, selectedCity }: OffersListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardHover = (id: string) => {
    setActiveCardId(id);
  };

  const handleCardLeave = () => {
    setActiveCardId(null);
  };

  const filteredCardsData: CardProps[] = cardsData.filter((card) => card.city.name === selectedCity.city.name);


  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredCardsData.length} places to stay in {selectedCity.city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {filteredCardsData.map((card) => (
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
        <Map className='cities__map' selectedCity={selectedCity} cardsData={filteredCardsData} activeOfferId={activeCardId} />
      </div>
    </div>
  );
}

export {OffersList};
