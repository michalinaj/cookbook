import React from "react";
import { Link } from "react-router-dom";

class RecipeIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: { ingredients: "" } };

  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }

  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    
    return(
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-1">
            <h3 className="display-7">{recipe.name} - Checkout</h3>
          </div>
        </section>
        <div className="container py-5">      
          <div className="row">
              <div className="col-sm-12 col-lg-3">
                <ul className="list-group">
                  <h5 className="mb-2">Ingredients</h5>
                  {ingredientList}
                </ul>
                <p className="font-weight-bold text-right">Total: $18.50</p>
              </div>
          </div>
        </div>
      </>
    );
  
  }
}

export default RecipeIngredients;