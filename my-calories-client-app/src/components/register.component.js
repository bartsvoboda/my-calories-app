import React , { Component } from 'react';
import axios from 'axios';

import {Col, Form, Button, Jumbotron} from 'react-bootstrap';


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeGoalWeight = this.onChangeGoalWeight.bind(this);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onChangeCurrentWeight = this.onChangeCurrentWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitloginButton = this.submitloginButton.bind(this);

    this.state = {
      email: '',
      password: '',
      username: '',
      age: '',
      isMale: true,
      height: 0,
      currentWeight: 0,
      goalWeight: 0,
      activity: 0
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      isMale: e.target.value
    })
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    })
  }

  onChangeCurrentWeight(e) {
    this.setState({
      currentWeight: e.target.value
    })
  }

  onChangeGoalWeight(e) {
    this.setState({
      goalWeight: e.target.value
    })
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value
    })
  }

  submitloginButton(){
    this.props.history.push('/');
  }

  onSubmit(e) {
    e.preventDefault();
    
    const user = {
      email:this.state.email,
      password: this.state.password,
      username: this.state.username,
      age: this.state.age,
      isMale: this.state.isMale,
      height: this.state.height,
      currentWeight: this.state.currentWeight,
      goalWeight: this.state.goalWeight,
      activity: this.state.activity
    }

    console.log(user);

    axios.post('http://localhost:5000/users/register', user)
      .then(res => console.log(res.data));
    
    this.props.history.push('/');
  }


    render() {
        return (
            <Form onSubmit ={this.onSubmit}>
              <Jumbotron>
                <h1> Rejestracja </h1>
                <p>
                  Witaj na stronie Rejestracji. Uzupełnij swoje dane i nacisnij przycisk <strong>zarejestruj</strong>.
                </p>
                <p> Jeżeli jednak masz konto i chcesz się zalogować nacisnij przycisk zaloguj</p>
                <p>
                  <Button variant="primary" onClick={this.submitloginButton}> Zaloguj</Button>
                </p>
              </Jumbotron>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="UserEmail"
                  required 
                  placeholder="Wprowadź email" 
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Wprowadź Hasło</Form.Label>
                <Form.Control 
                  type="password"
                  name="UserPassword"
                  required 
                  placeholder="Hasło"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control 
                  type="text"
                  name="UserUsername"  
                  placeholder="Nazwa użytkownika"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
              </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" custom onChange={this.onChangeGender}>
                  <option value ="true">Mężczyzna</option>
                  <option value = "false">Kobieta</option>
                </Form.Control>
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridActivity">
                <Form.Label>Poziom aktywności</Form.Label>
                <Form.Control as="select" custom onChange={this.onChangeActivity}>
                  <option value ="1">Siedzący tryb (brak ćwiczeń lub minimalne ćwiczenia)</option>
                  <option value = "2">Lekka aktywność (od 1 do 3 razy w tygodniu)</option>
                  <option value = "3">Umiarkowanie aktywny (od 3 do 5 razy w tygodniu)</option>
                  <option value = "4">Bardzo aktywny (od 6 do 7 dni)</option>
                  <option value = "5">Ekstra aktywny (bardzo ciężke ćwiczenia przez 6 lub 7 dni lub praca fizyczna)</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Wiek</Form.Label>
                <Form.Control 
                  type="Number" 
                  placeholder="Wiek"
                  required
                  value = {this.state.age}
                  onChange = {this.onChangeAge}
                  />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridHeight">
                <Form.Label>Wzrost (cm)</Form.Label>
                <Form.Control 
                  type="Number" 
                  placeholder="Wzrost"
                  required
                  value = {this.state.height}
                  onChange = {this.onChangeHeight}
                  />
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridCurrentWeight">
                <Form.Label>Obecna Waga (kg)</Form.Label>
                <Form.Control 
                  type="Number" 
                  placeholder="Obecna Waga"
                  required
                  value = {this.state.currentWeight}
                  onChange = {this.onChangeCurrentWeight}
                  />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGoalWeight">
                <Form.Label>Docelowa waga (kg)</Form.Label>
                <Form.Control 
                  type="Number" 
                  placeholder="Docelowa waga"
                  required
                  value = {this.state.goalWeight}
                  onChange = {this.onChangeGoalWeight}
                  />
              </Form.Group>
            </Form.Row>
          
            <Button variant="primary" type="submit">
              Zarejestruj
            </Button>
          </Form>
        )
    }
}