import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './feat/Home/Dashboard';
import UserList from "./feat/UserList/UserList";
import * as s from './App.css';
import Nav from '../src/feat/Nav/Nav';

function App() {
  return (
      <div className={s.root}>
          <div className={s.nav}>
              <Nav />
          </div>
            <BrowserRouter>
            <Switch>
                <Route path="/users" component={UserList} />
                <Route path="/" component={Dashboard} />
            </Switch>
            </BrowserRouter>
    </div>
  );
}

export default App;
