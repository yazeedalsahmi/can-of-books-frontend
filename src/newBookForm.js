import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {withAuth0}  from "@auth0/auth0-react";



export class newBookForm extends Component {
render() {
        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.handelDisplayModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>BOOKS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e)=>this.props.addBook(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book title</Form.Label>
                                <Form.Control 
                                type="text"   name="bookName" placeholder="Enter book name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book description</Form.Label>
                                <Form.Control  name="description"
                               type="text" placeholder="Book Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text"  name="status" placeholder="Book Status" />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add a new book
  </Button>
  <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handelDisplayModal}>
              Close
            </Button>
          </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}


export default withAuth0(newBookForm); 