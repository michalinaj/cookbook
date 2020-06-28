import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import RecipeIngredients from "../components/RecipeIngredients";
import PaypalButton from "../components/PaypalButton";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/recipe/:id/ingredients" 
      render={props => 
      <Fragment>
        <RecipeIngredients {...props} />
        <PaypalButton {...props} />
      </Fragment>} 
      />
      <Route path="/recipe" exact component={NewRecipe} />
    </Switch>
  </Router>
);