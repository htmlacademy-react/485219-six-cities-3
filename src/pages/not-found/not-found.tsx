import { Link } from 'react-router-dom';
import {AppRoute} from '../../components/utils/routes.ts';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__paragraph">page not found</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export {NotFound};
