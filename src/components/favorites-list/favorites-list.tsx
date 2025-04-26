import {CardProps} from '../offer-card/offer-card-data.ts';
import {FavoriresCard} from '../favorites-card/favorires-card.tsx';

type FavoritesListProps = {
  cardsData: CardProps[];
}

function groupByCity(cards: CardProps[]): Record<string, CardProps[]> {
  return cards.reduce((acc, card) => {
    const city: string = card.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(card);
    return acc;
  }, {} as Record<string, CardProps[]>);
}

function FavoritesList({cardsData}: FavoritesListProps) {
  const groupedByCity = groupByCity(cardsData);
  const cities = Object.keys(groupedByCity);

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {groupedByCity[city].map((card) => (
              <FavoriresCard key={card.id} {...card} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export {FavoritesList};
