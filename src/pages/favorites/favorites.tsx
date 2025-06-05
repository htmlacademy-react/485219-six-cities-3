import { FavoritesList } from '../../components/favorites-list/favorites-list.tsx';

function Favorites(): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <FavoritesList />
      </section>
    </div>
  );
}

export { Favorites };
