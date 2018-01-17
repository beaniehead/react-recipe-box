import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Recipe from "./Recipe";
import sampleRecipes from "./sample-recipes";
import RecipeForm from "./RecipeForm";
import { Button } from "reactstrap";

class App extends React.Component {

  constructor() {
    super();
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.toggle = this.toggle.bind(this);
    this.cancelCreate = this.cancelCreate.bind(this);
   }


  componentWillMount() {
    const localStorageRef = JSON.parse(localStorage.getItem("recipes"));
    if (localStorageRef) {
      this.setState ({
        recipes: localStorageRef,
        editID: "",
        modal:false
      })
    } else {
      this.setState ({
        recipes: sampleRecipes,
        editID: "",
        modal:false
      })
    }
  }
  
  componentDidUpdate() {
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  }
  
  cancelCreate() {
    this.setState({
      editID: ""
    })
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  editRecipe(recipe) {
    this.setState({
      editID: recipe
    })
    this.toggle();
  }

  addRecipe(recipe, editID) {
    //update state
    const recipes = { ...this.state.recipes };
    //add in new recipe with timestamp
    const timeStamp = Date.now();
    if (editID) {
      recipes[editID] = recipe;
    } else {
      recipes[`recipe-${timeStamp}`] = recipe;
    }
    //set state
    this.setState({
      recipes,
      //reset ID of recipes to be edited
      editID: ""
    });
  }

  deleteRecipe(index) {
    const recipes = { ...this.state.recipes };
    delete recipes[index];
    this.setState({ recipes });
  }

  render() {
    return (
      <div className="App container-fluid">
        <header className="App-header">
          <h1 className="App-title">Recipe <img src={logo} className="App-logo" alt="logo" /> Box</h1>
        </header>
        
          <div className="recipes " id="index" role="tablist">
            {Object
              .keys(this.state.recipes)
              .map(recipe =>
                <Recipe
                  key={recipe}
                  index={recipe}
                  details={this.state.recipes[recipe]}
                  recipes={this.state.recipes}
                  deleteRecipe={this.deleteRecipe}
                  editRecipe={this.editRecipe}
                  toggle={this.toggle}
                  />)
            }
          </div>
        
        <Button color="info" onClick={this.toggle} >Create Recipe</Button>
        <RecipeForm
          editID={this.state.editID}
          addRecipe={this.addRecipe}
          toggle={this.toggle}
          modal={this.state.modal}
          recipes={this.state.recipes}
          cancelCreate={this.cancelCreate}
        />
      </div>
    );
  }
}

export default App;
