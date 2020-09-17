import React from "react";
import { Route, Switch } from "react-router";
import App from "./App";
import DiscoveryMovies from "./app/containers/discoveryMovies";
import MovieDetails from "./app/containers/movieDetails";

import 'antd/dist/antd.css';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => (<App />)}></Route>
        <Route path="/discovers" render={() => (<DiscoveryMovies />)}></Route>
        <Route path="/movie/:id" render={() => (<MovieDetails id="" />)}></Route>
      </Switch>
    </>
  );
}

export default Routes;
