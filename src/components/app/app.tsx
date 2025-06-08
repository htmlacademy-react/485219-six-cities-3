import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../utils/routes.ts';
import { MainPage } from '../../pages/main-page/main-page.tsx';
import { FavoritesEmpty } from '../../pages/favorites-empty/favorites-empty.tsx';
import { Login } from '../../pages/login/login.tsx';
import { MainEmpty } from '../../pages/main-empty/main-empty.tsx';
import { NotFound } from '../../pages/not-found/not-found.tsx';
import { Offer } from '../../pages/offer/offer.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { Favorites } from '../../pages/favorites/favorites.tsx';
import { AuthorizationStatus } from '../utils/auth-statuses.ts';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchOffers } from '../../store/offers-slice';
import {checkAuthAction} from '../../store/api-actions.ts';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route
          path={AppRoute.Offer}
          element={<Offer authorizationStatus={AuthorizationStatus.Auth} />}
        />
        <Route path={AppRoute.MainEmpty} element={<MainEmpty />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.FavoritesEmpty}
          element={
            <PrivateRoute>
              <FavoritesEmpty />
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
