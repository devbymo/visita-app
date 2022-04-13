import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import Navbar from './shared/components/Navigation/Navbar';

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
      </Switch>
    </div>
  );
}

export default App;
