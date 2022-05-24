import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
// import Header from './componets/header';
//
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />

      </Switch>
    </div>
  );
}
