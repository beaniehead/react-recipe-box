import React from "react";
import logo from "./logo.svg";
import { ListGroup, ListGroupItem } from 'reactstrap';
import DeleteWarning from "./deleteWarning";

class Recipe extends React.Component {
  constructor() {
    super();
    this.toggle2 = this.toggle2.bind(this);

    this.state = ({
      modal: false
    })
  }
  toggle2() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {


    const { details, index } = this.props;

    return (
      
        <div className="card">
          <div className="card-header recipe-name" role="tab" id={details.name}>
            <h5 className="mb-0">
              <a data-toggle="collapse" href={`#${details.name}-ingredients`} role="button" aria-expanded="true" aria-controls={details.name}>
                {details.name}
              </a>
            </h5>
          </div>

          <div id={`${details.name}-ingredients`} className="recipe-ingredients collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#index">
            <div className="card-body">
              <h5>Ingredients</h5>
              <ListGroup>
                {details.ingredients.map(ingredient =>
                  <ListGroupItem className="ingredient" key={`${details.name}-${ingredient}`}>{ingredient}</ListGroupItem>
                )}
              </ListGroup>
              <div className="buttonGroup">
                <button
                  className="btn btn-danger"
                  onClick={this.toggle2}
                >
                  Delete
              </button>
                {/* <button className="btn btn-danger" onClick={() => this.props.deleteRecipe(index)}>Delete</button> */}
                <button className="btn btn-light" onClick={() => this.props.editRecipe(index)}>Edit</button>
              </div>
            </div>
          </div>
          <DeleteWarning
          modal={this.state.modal}
          toggle2={this.toggle2}
          delete={this.props.deleteRecipe}
          index={this.props.index} />
        </div>
        
      
    );
  }
}

export default Recipe;
