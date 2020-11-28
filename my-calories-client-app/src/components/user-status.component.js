
import React , { Component } from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';


import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { getJwt } from '../helpers/jwt';


export default class UserStatus extends Component {
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
            console.log(res.data.activity);
        })
    }


    render() {
        //Calculate BMI
        let heightInMeters = this.state.height * 0.01;
        let BMI = this.state.currentWeight/heightInMeters ** 2;

        //perfect weight
        let minPerfectWeight = 18.6 * (heightInMeters ** 2);
        let maxPerfectWeight = 24.9 * (heightInMeters ** 2);

        //Set State according to BMI
        let status = undefined;

        if(BMI < 18.6){
            status = "Niedowaga";
        } else if (BMI >= 18.6 && BMI < 25){
            status = "Waga prawidłowa";
        } else if (BMI >= 25 && BMI <30){
            status = "Nadwaga";
        } else if (BMI >= 30 && BMI <35){
            status = "Otyłość";
        } else if (BMI >= 35 && BMI <40){
            status = "Otyłość II stopnia";
        } else {
            status = "Otyłość Olbrzymia";
        }

        //calculate BMR according to Mifflin-St Jeor method
        let BMR = 0;

        if(this.state.isMale){
            BMR = (9.99 * this.state.currentWeight) + (6.25 * this.state.height) - (4.92 * this.state.age) + 5;

        } else {
            BMR = (9.99 * this.state.currentWeight) + (6.25 * this.state.height) - (4.92 * this.state.age) - 161;
        }

        //calculate Daily Calories intake
        let BMRwithActivity = 0;
        let activityLevel = undefined;

        if(this.state.activity === '1') {
            BMRwithActivity = BMR * 1.2;
            activityLevel = "Siedzący tryb życia";
        }
        if(this.state.activity === '2') {
            BMRwithActivity = BMR * 1.375;
            activityLevel = "Lekka aktywność";
        }
        
        if(this.state.activity === '3') {
            BMRwithActivity = BMR * 1.55;
            activityLevel = "Umiarkowana aktywność";
        }
        
        if(this.state.activity === '4') {
            BMRwithActivity = BMR * 1.725;
            activityLevel = "Bardzo duża aktywność";
        }
        
        if(this.state.activity === '5') {
            BMRwithActivity = BMR * 1.9;
            activityLevel = "Ekstemalna aktywność";
        }
        
        //Calculate propoper daily calories intake
        let goal = undefined;
        let dailyCalories = 0;
        if(this.state.currentWeight>this.state.goalWeight){
            goal = "Utrata masy ciała";
            dailyCalories = BMRwithActivity - 500; 
        } 
        if (this.state.currentWeight === this.state.goalWeight){
            goal = "Utrzymanie masy ciała";
            dailyCalories = BMRwithActivity;
        } 
        if (this.state.currentWeight < this.state.goalWeight){
            goal = "Zwiekszenie masy ciała";
            dailyCalories = BMRwithActivity + 500;
        }

        localStorage.setItem('dailyCalories', dailyCalories);

        //Estimate number of weeks to reach weight
        let numberofWeeks=0;
        if(goal === "Utrata masy ciała"){
            numberofWeeks = (this.state.currentWeight - this.state.goalWeight)/0.5;
        }
        if(goal === "Zwiekszenie masy ciała"){
            numberofWeeks = (this.state.goalWeight - this.state.currentWeight)/0.5;
        }
        

        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <Jumbotron>
                        <h1> Witaj <i> {this.state.username} ! </i> </h1>
                        <br/>
                        <p> Twój obecny stan to <strong> {status} </strong>. Dla twojego wzrostu idealna waga to od <strong> {minPerfectWeight.toFixed(2)} </strong> kg do <strong> {maxPerfectWeight.toFixed(2)} </strong> kg .</p> 
                        <p> Twoj cel to <strong>{goal} </strong>. Rekomendowana zmiana wagi wynosi 0,5 kg na tydzień.</p>
                        
                        <p> Przy twojej aktywności: <strong>{activityLevel} </strong> musisz dostarczać <strong>{dailyCalories.toFixed(0)} </strong> kcal dziennie aby osiągnąć cel.</p>
                        <p> Osiągniecie twojej docelowej masy ciała zajmie Ci około <strong>{numberofWeeks} tygodni</strong> przy zmianie pół kilograma tygodniowo.</p>
                        <br/>
                        <br/>

                        <p> <strong>Nazwa uzytkownika: </strong> {this.state.username} </p>
                        <p> <strong> Wzrost: </strong> {this.state.height} cm</p>
                        <p> <strong> Obecna waga: </strong> {this.state.currentWeight} kg </p>
                        <p> <strong> Docelowa waga: </strong> {this.state.goalWeight} kg</p>
                        <p> <strong> BMI: </strong> {BMI.toFixed(2)} </p>
                        <p> <strong> STAN: </strong>{status} </p>
                        <p> <strong> BMR: </strong> {BMR.toFixed(0)} kcal</p>
                        <p> <strong> Ilość dziennych kalorii: </strong> {dailyCalories.toFixed(0)} kcal </p>
                        <br/>
                        
                </Jumbotron>        
                   
            </div>
        )
    }
}