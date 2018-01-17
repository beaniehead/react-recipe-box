import React from "react";
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class DeleteWarning extends React.Component {
constructor(){
  super();
}
  render() {
    const {index} = this.props;
    return (
      
      <Modal 
      backdrop="static"
      isOpen={this.props.modal} 
      toggle={this.props.toggle2} 
      className="confirmDelete"
      >
        <ModalHeader>
          Are you sure you want to delete this recipe?
          </ModalHeader>
        <ModalFooter>
          <Button onClick={() => this.props.delete(index)} color="primary" >Delete</Button>
          <Button color="secondary" onClick={this.props.toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal >
      
    )
  }
}

export default DeleteWarning;
