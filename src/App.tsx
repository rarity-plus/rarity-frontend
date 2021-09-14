import React, { useState, useEffect } from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history'

import LoginView from './views/LoginView';
import CharacterSelectionView from './views/CharacterSelectionView';
import GameView from './views/GameView';

const history = createBrowserHistory()

const App: React.FC = () => {

  return (
    <Router history={history}>
      <Switch>
          <Route exact path={'/'} component={LoginView} />
          <Route exact path={'/character'} component={CharacterSelectionView} />
          <Route exact path={'/play'} component={GameView} />
      </Switch>
    </Router>
  );
}


export default App;
