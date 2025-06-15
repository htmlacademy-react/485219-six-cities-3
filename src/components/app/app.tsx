import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../utils/routes.ts';
import {MainPage} from '../../pages/main-page/main-page.tsx';
import {Login} from '../../pages/login/login.tsx';
import {NotFound} from '../../pages/not-found/not-found.tsx';
import {Offer} from '../../pages/offer/offer.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Favorites} from '../../pages/favorites/favorites.tsx';
import {useEffect} from 'react';
import {useAppDispatch} from '../../store';
import {fetchOffers} from '../../store/offers-slice';
import {checkAuthAction} from '../../store/api-actions.ts';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Routes location={location} key={location.pathname}> {/* Добавлено управление состоянием */}
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Offer} element={<Offer />} />
      <Route path={AppRoute.NotFound} element={<NotFound />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Login} element={<Login />} />
    </Routes>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export { Root as App };
