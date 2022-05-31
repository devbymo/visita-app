import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import Navbar from './shared/components/Navigation/Navbar';
import TestComponent from './user/components/TestComponent';
import NotFound from './shared/components/NotFound/NotFound';
import UserPlaces from './place/pages/UserPlaces';
import NewPlace from './place/pages/NewPlace';
import UpdatePlace from './place/pages/UpdatePlace';

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
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
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        {/* Page not found error */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
