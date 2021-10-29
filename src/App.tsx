import React from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router";
import { createBrowserHistory } from 'history'

import Layout from '@components/Layout';

import HomeView from '@views/Home';
import GameView from '@views/Game';

const history = createBrowserHistory()

const App = () => {
  
  return (
    <Router history={history}>
      <Layout>
        <Switch>
            
          <Route exact path="/">
            <HomeView />
          </Route>

          <Route exact path="/game">
            <GameView />
          </Route>    
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
