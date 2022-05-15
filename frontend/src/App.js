import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import Navbar from './shared/components/Navigation/Navbar';
import TestComponent from './user/components/TestComponent';
import NotFound from './shared/components/NotFound/NotFound';
import UserPlaces from './place/pages/UserPlaces';
import NewPlace from './place/pages/NewPlace';

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/users" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
