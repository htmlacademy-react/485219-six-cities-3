enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id',
  NotFound = '*'
}

enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export { AppRoute, APIRoute };
