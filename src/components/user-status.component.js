import React , { Component } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

export default class UserStatus extends Component {
    render() {
        return (
            <div>
                <p> Obecna waga: </p>
                <p> Docelowa waga: </p>
                <p> BMI: </p>
                <p> STAN: </p>
                <p> Ilość dziennych kalorii: </p>
                <ProgressBar now={60} />
            </div>
        )
    }
}