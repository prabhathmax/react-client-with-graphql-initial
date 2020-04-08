import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './feat/Home/Dashboard';
import UserList from "./feat/UserList/UserList";
import ErrorBoundry from "./utils/ErrorBoundry"

function App() {
  return (
    <div className="App">
        <ErrorBoundry>
            <BrowserRouter>
            <Switch>
                <Route path="/users" component={UserList} />
                <Route path="/" component={Dashboard} />
            </Switch>
            </BrowserRouter>
        </ErrorBoundry>
    </div>
  );
}

export default App;
