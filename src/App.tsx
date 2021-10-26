import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Layout from '@components/Layout';

import Home from '@views/Home';

const App = () => {
  
  return (
    <Layout>
        <Router>
          <Switch>
            
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    </Layout>
  );
}

export default App;
