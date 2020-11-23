import React , { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { getJwt } from '../helpers/jwt';


export default class UserData extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            age: 0,
            isMale: true,
            height: 0,
            currentWeight: 0,
            goalWeight: 0,
            activity: ''
        }
    }

    componentDidMount(){
        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/users/getUser',
        {headers: { Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data);
            this.setState({
                email: res.data.email,
                password: res.data.password,
                username: res.data.username,
                age: res.data.age,
                isMale: res.data.isMale,
                height: res.data.height,
                currentWeight: res.data.currentWeight,
                goalWeight: res.data.goalWeight,
                activity: res.data.activity
            }
            );
        })
    }



    render() {
        let gender = undefined;

        if(this.state.isMale){
            gender = "Mężczyzna";
        } else {
            gender = "Kobieta";
        }

        let activityLevel = undefined;

        if(this.state.activity === '1') {
            activityLevel = "Siedzący tryb życia";
        }
        if(this.state.activity === '2') {
            activityLevel = "Lekka aktywność";
        }
        
        if(this.state.activity === '3') {
            activityLevel = "Umiarkowana aktywność";
        }
        if(this.state.activity === '4') {
            activityLevel = "Bardzo duża aktywność";
        }
        if(this.state.activity === '5') {
            activityLevel = "Ekstemalna aktywność";
        }

        return (
            <div>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <Jumbotron>
                    <h1> Witaj <i> {this.state.username} ! </i> </h1>
                    <br/>
                    <p> <strong> Email: </strong> {this.state.email} </p>
                    <p> <strong> Płeć: </strong> {gender}  </p>
                    <p> <strong> Wiek: </strong> {this.state.age} lat </p>
                    <p> <strong> Wzrost: </strong> {this.state.height} lat </p>
                    <p> <strong> Obecna waga: </strong> {this.state.currentWeight} kg</p>
                    <p> <strong> Docelowa waga: </strong> {this.state.goalWeight} kg</p>
                    <p> <strong> Twoja aktywność: </strong> {activityLevel} </p>
                </Jumbotron>        
            </div>
        )
    }
}