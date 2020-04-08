import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './feat/Home/Dashboard';
import UserList from "./feat/UserList/UserList";

function App() {
  return (
    <div className="App">
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
