// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateOrder from './pages/CreateOrder';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create-order" component={CreateOrder} />
        <Route path="/" component={Login} /> {/* Default to Login if no path matched */}
      </Switch>
    </Router>
  );
}
