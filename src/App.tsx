import React, { useState, useEffect } from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history'

import LoginView from './views/LoginView';
import CharacterSelectionView from './views/CharacterSelectionView';
import GameView from './views/GameView';

import Layout from './components/Layout';

const history = createBrowserHistory()

const App: React.FC = () => {

  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path={'/'} component={LoginView} />
          <Route exact path={'/character'} component={CharacterSelectionView} />
          <Route exact path={'/play'} component={GameView} />
        </Switch>
      </Layout>
    </Router>
  );
}


export default App;
