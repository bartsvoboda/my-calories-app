import React , { Component } from 'react';


import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Register extends Component {
    render() {
        return (
            <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridActivity">
                <Form.Label>Acitivity level</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Zero</option>
                  <option>Troche</option>
                  <option>Sredni</option>
                  <option>Sporo</option>
                  <option>Napierdalam w LG CHEM u kima</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          
            <Form.Row>
              <Form.Group as={Col} controlId="formGridHeight">
                <Form.Label>Wzrost (cm)</Form.Label>
                <Form.Control type="text" placeholder="Wzrost" />
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridCurrentWeight">
                <Form.Label>Obecna Waga (kg)</Form.Label>
                <Form.Control type="text" placeholder="Obecna Waga" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Docelowa waga (kg)</Form.Label>
                <Form.Control type="text" placeholder="Docelowa waga" />
              </Form.Group>
            </Form.Row>
          
           
          
            <Button variant="primary" type="submit">
              Zarejestruj
            </Button>
          </Form>
        )
    }
}