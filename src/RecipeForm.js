import React from "react";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RecipeForm extends React.Component {
  constructor() {
    super();

    this.createRecipe = this.createRecipe.bind(this);
  }

  createRecipe(e) {
    e.preventDefault();
    const { editID } = this.props;
    if (this.ingredients.value && this.name.value) {
      const recipe = {
        name: this.name.value,
        ingredients: (this.ingredients.value).split(",")
      }
      this.props.addRecipe(recipe, editID);
      this.props.toggle();
      this.recipeForm.reset();

    } else {
      const recipeAlert = document.querySelector(".recipeAlert");
      recipeAlert.classList.add("show");
      recipeAlert.style.display = "block";
      console.log("Please complete your recipe");
    }
  }

  render() {
    const { editID } = this.props;
    const recipe = this.props.recipes[editID];
    return (
      <div>
        <Modal
        backdrop="static"
          isOpen={this.props.modal}
          toggle={this.props.toggle} className="recipeFormModal">
          <ModalHeader>
            <div>{recipe ? "Edit Recipe" : "New Recipe"}</div>

          </ModalHeader>
          <div class="recipeAlert alert alert-warning fade " role="alert">Please complete all recipe fields.</div>
          <form className="recipeForm" ref={(input) => this.recipeForm = input} onSubmit={(e) => this.createRecipe(e)}>
            <ModalBody>
              <input
                type="text"
                ref={(input) => this.name = input}
                placeholder="Recipe Name"
                defaultValue={(recipe) ? recipe.name : ""}
              />
              <textarea
                ref={(input) => this.ingredients = input} placeholder="Ingredients - separated by commas"
                defaultValue={(recipe) ? recipe.ingredients : ""}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">Save</Button>
              <Button color="secondary" onClick={this.props.cancelCreate}>Cancel</Button>
            </ModalFooter>
          </form >
        </Modal>
      </div>
    )
  }
}

export default RecipeForm;
