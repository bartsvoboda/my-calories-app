import React , { Component } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

export default class UserStatus extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: "Kim",
            lastname: "Chyong-Sun",
            fullname: "",
            weight: 94,
            height: 186
        }
    }
    
    formatName(state) {
        return state.firstName + ' ' + state.lastName;
    }

    handleClick() {
        console.log('Click happened');
    }

    render() {
        return (
            <div>
                <div>
                    <label> Nazwa uzytkownika:</label>
                    <p>{this.p}</p>
                </div>            
                <p > Nazwa uzytkownika: </p>
                <p> Obecna waga: </p>
                <p> Docelowa waga:</p>
                <p> BMI: {this.state.fullname} </p>
                <p> STAN: </p>
                <p> Ilość dziennych kalorii: </p>
                <ProgressBar now={60} />
            </div>
        )
    }
}