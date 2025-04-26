import {CardProps} from '../../components/offer-card/offer-card-data.ts';
import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';

type FavoritesProps = {
  cardsData: CardProps[];
}

function Favorites({cardsData}: FavoritesProps): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <FavoritesList cardsData={cardsData} />
      </section>
    </div>
  );
}

export {Favorites};
