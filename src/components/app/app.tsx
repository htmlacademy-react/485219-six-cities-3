import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../utils/routes.ts';
import {CardProps} from '../offer-card/offer-card-data.ts';
import {MainPage} from '../../pages/main-page/main-page.tsx';
import {FavoritesEmpty} from '../../pages/favorites-empty/favorites-empty.tsx';
import {Login} from '../../pages/login/login.tsx';
import {MainEmpty} from '../../pages/main-empty/main-empty.tsx';
import {NotFound} from '../../pages/not-found/not-found.tsx';
import {Offer} from '../../pages/offer/offer.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Favorites} from '../../pages/favorites/favorites.tsx';
import {AuthorizationStatus} from '../utils/auth-statuses.ts';


type AppProps = {
  cardsData: CardProps[];
}

function App({cardsData}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage cardsData={cardsData}/>}/>
        <Route path={AppRoute.Offer} element={<Offer/>}/>
        <Route path={AppRoute.MainEmpty} element={<MainEmpty/>}/>
        <Route path={AppRoute.NotFound} element={<NotFound/>}/>

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites/>
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.FavoritesEmpty}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesEmpty/>
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.Login} element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export {App};
