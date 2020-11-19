import React , { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Login extends Component {
    render() {
        return (
            <Form>
              <Jumbotron className="mr-auto">
              <h1>Witaj w aplikacji <strong> MyCalories </strong></h1>
              <p>Aplikacja pozwala na monitorowanie kalori z jedzenia i ćwiczeń</p>
              <p> Zaloguj się poniżej, jeżeli nie masz konta możesz założyc je klikając w poniższy przycisk</p>
              <p>
                 <Button variant="primary">Zerejstruj</Button>
              </p>

              </Jumbotron>

              <Container> 
                <Row className="justify-content-md-center">
                  <Col className="mr-auto">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" href="/menu">
                      Zaloguj
                    </Button>
                  </Col>  
                </Row>
              </Container>
            </Form>
        )
    }
}