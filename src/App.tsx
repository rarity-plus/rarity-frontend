import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Layout from '@components/Layout';

import HomeView from '@views/Home';
import GameView from '@views/Game';

const App = () => {
  
  return (
    <Layout>
        <Router>
          <Switch>
            
            <Route path="/">
              <HomeView />
            </Route>

            <Route path="/game">
              <GameView />
            </Route>
            
          </Switch>
        </Router>
    </Layout>
  );
}

export default App;
