import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '@/containers/app';
import Login from '@/pages/login';
import NotFound from '@/pages/notFound';

// eslint-disable-next-line no-unused-vars
const Routes = props => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
