enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Login = '/login',
  Offer = '/offer/:id',
  MainEmpty = '/main-empty',
  NotFound = '*'
}

enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export { AppRoute, APIRoute };
