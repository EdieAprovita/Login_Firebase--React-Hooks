import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import Reset from './components/Reset';

import { auth } from './firebase';

function App() {
  const [firebaseUser, setfirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setfirebaseUser(user);
      } else {
        setfirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path='/' exact>
            Home
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/reset'>
            <Reset />
          </Route>
          <Route path='/admin'>
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading</p>
  );
}

export default App;
