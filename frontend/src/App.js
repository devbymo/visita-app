import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import Navbar from './shared/components/Navigation/Navbar';
import UserPlaces from './place/pages/UserPlaces';
import NewPlace from './place/pages/NewPlace';
import UpdatePlace from './place/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/useAuth';

function App() {
  const { login, logout, isAuthenticated, userId, token } = useAuth();

  let routes;

  if (isAuthenticated) {
    routes = (
      <Switch>
        {/* The root page which display all users */}
        <Route path="/" exact>
          <Users />
        </Route>
        {/* Display all users */}
        <Route path="/users" exact>
          <Redirect to="/" />
        </Route>
        {/* Display user places */}
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        {/* Create new place */}
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* Update The place */}
        <Route path="/:creatorId/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        {/* Auth page */}
        <Route path="/auth" exact>
          <Auth />
        </Route>
        {/* Page not found error */}
        {/* <Route path="*">
          <NotFound />
        </Route> */}
        {/* The default page */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* The root page which display all users */}
        <Route path="/" exact>
          <Users />
        </Route>
        {/* Display all users */}
        <Route path="/users" exact>
          <Redirect to="/" />
        </Route>
        {/* Display user places */}
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        {/* Auth page */}
        <Route path="/auth" exact>
          <Auth />
        </Route>
        {/* Page not found error */}
        {/* <Route path="*">
          <NotFound />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userId, token }}
    >
      <div className="app">
        <header>
          <Navbar />
        </header>
        <main>{routes}</main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
