import React, { Component } from 'react';
import axios from 'axios';

import {Col, Form, Button, Jumbotron} from 'react-bootstrap';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { getJwt } from '../helpers/jwt';

export default class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeCurrentWeight = this.onChangeCurrentWeight.bind(this);
        this.onChangeGoalWeight = this.onChangeGoalWeight.bind(this);
        this.onChangeActivity = this.onChangeActivity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            age:0,
            isMale: true,
            height: 0,
            currentWeight: 0,
            goalWeight: 0,
            activity: '1'
        }
    }

    componentDidMount() {
        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/users/getUser',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data._id);
            this.setState({
                username: res.data.username,
                age: res.data.age,
                isMale: res.data.isMale,
                height: res.data.height,
                currentWeight: res.data.currentWeight,
                goalWeight: res.data.goalWeight,
                activity: res.data.activity
            });
            console.log(res.data.activity);
            console.log(typeof(res.data.activity));
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangeAge(e){
        this.setState({
            age: e.target.value
        })
    }
    onChangeGender(e){
        this.setState({
            isMale: e.target.value
        })
    }
    onChangeHeight(e){
        this.setState({
            height: e.target.value
        })
    }
    onChangeCurrentWeight(e){
        this.setState({
            currentWeight: e.target.value
        })
    }
    onChangeGoalWeight(e){
        this.setState({
            goalWeight: e.target.value
        })
    }
    onChangeActivity(e){
        this.setState({
            activity: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const tokenjwt = getJwt();
        const user = { 
          username: this.state.username,
          age: this.state.age,
          isMale: this.state.isMale,
          height: this.state.height,
          currentWeight: this.state.currentWeight,
          goalWeight: this.state.goalWeight,
          activity: this.state.activity
        }
    
        console.log(user.activity);
        console.log(typeof(user.activity));
    
        axios.patch('http://localhost:5000/users/updateUser',user,{
            headers: {
                Authorization: `Bearer ${tokenjwt}`
            }
        })
       .then(res => console.log(res.data));
        this.props.history.push("/user/status");
        window.location.reload();
    }
    

    render() {
        return (
            <Form onSubmit ={this.onSubmit}>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <Jumbotron>
                    <h1> Edycja Danych </h1>
                    <p>
                    Witaj na stronie Edycji danych. Wyedytuj tylko te dane które chcesz zmienić i naciśnij przycisk <strong>aktualizuj</strong>.
                    </p>
                    <p> Jeżeli jednak nie chcesz edytować danych naciśnij przycisk poniżej</p>
                    <p>
                    <Button variant="primary" href="/user/status"> Status</Button>
                    </p>
                </Jumbotron>
                <Form.Row>
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
                    <Form.Label>Płeć</Form.Label>
                    <Form.Control as="select" custom onChange={this.onChangeGender} value={this.state.isMale}>
                    <option value ={true}>Mężczyzna</option>
                    <option value = {false}>Kobieta</option>
                    </Form.Control>
                </Form.Group>
            
                <Form.Group as={Col} controlId="formGridActivity">
                <Form.Label>Poziom aktywności</Form.Label>
                <Form.Control as="select" custom onChange={this.onChangeActivity} value={this.state.activity}>
                  <option value ={"1"}>Siedzący tryb (brak ćwiczeń lub minimalne ćwiczenia)</option>
                  <option value = {"2"}>Lekka aktywność (od 1 do 3 razy w tygodniu)</option>
                  <option value = {"3"}>Umiarkowanie aktywny (od 3 do 5 razy w tygodniu)</option>
                  <option value = {"4"}>Bardzo aktywny (od 6 do 7 dni)</option>
                  <option value = {"5"}>Ekstra aktywny (bardzo ciężke ćwiczenia przez 6 lub 7 dni lub praca fizyczna)</option>
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
          
            <Button variant="primary" type="submit" >
              Zaktualizuj
            </Button>
          </Form>
        )
    }
}