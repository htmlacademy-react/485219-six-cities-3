import {CardProps} from '../offer-card/offer-card-data.ts';
import {OfferCard} from '../offer-card/offer-card.tsx';
import {useState} from 'react';

type OffersListProps = {
  cardsData: CardProps[];
}

function OffersList({ cardsData }: OffersListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  void activeCardId; //заглушка

  const handleCardHover = (id: string) => {
    setActiveCardId(id);
  };

  const handleCardLeave = () => {
    setActiveCardId(null);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cardsData.length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
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
          {cardsData.map((card) => (
            <OfferCard
              key={card.id}
              id={card.id}
              img={card.img}
              isPremium={card.isPremium}
              price={card.price}
              rating={card.rating}
              cardTitle={card.cardTitle}
              cardType={card.cardType}
              city={card.city}
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={handleCardLeave}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

export {OffersList};
