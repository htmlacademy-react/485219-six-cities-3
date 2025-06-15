import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {FavoritesEmpty} from '../../components/favorites-empty/favorites-empty.tsx';
import {useAppDispatch, useAppSelector} from '../../store';
import {getFavoriteOffers} from '../../store/selectors';
import {Header} from '../../components/header/header.tsx';
import {AppRoute} from '../../components/utils/routes.ts';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchFavorites} from '../../store/api-actions.ts';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const hasFavorites = favoriteOffers.length > 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={`page ${!hasFavorites ? 'page--favorites-empty' : ''}`}>
      <Header/>

      <main className={`page__main page__main--favorites ${!hasFavorites ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {hasFavorites ? (
              <FavoritesList/>
            ) : (
              <FavoritesEmpty/>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <Link className="header__logo-link" to={AppRoute.Main}>
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
        </Link>
      </footer>
    </div>
  );
}

export {Favorites};
