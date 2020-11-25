import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

import { getJwt } from '../helpers/jwt';

const Exercise = props => (
    <tr>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.kcalperhour}</td>
        <td>{(props.exercise.kcalperhour)*(props.exercise.duration/60).toFixed(1)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)


export default class CaloriesDiary extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        let todayDate = new Date();

        this.state = {
            userId: '',
            exercises: [],
            foods: [],
            dateYear: todayDate.getFullYear(),
            dateMonth: todayDate.getMonth()+1,
            dateDay: todayDate.getDate()
        };
    }

    componentDidMount() {
        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/exercises',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data);
            this.setState({
                exercises: res.data.filter(el => el.dateDay === this.state.dateDay)
            })            
        })
        .catch(error => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => console.log(response.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise = {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render(){
        let exerciseSumKcal = this.state.exercises.reduce(function(prev, current){
            return prev + +(current.kcalperhour*(current.duration/60))
        },0);
        return(
            <div>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <h1> Dziennik </h1>
                <h3> Dzisiejsze Ćwiczenia</h3>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Nazwa</th>
                            <th>Czas Trwania (minuty)</th>
                            <th>Kcal/godzina</th>
                            <th> Kcal </th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
                <p>Suma Kalorii z ćwiczeń : {exerciseSumKcal.toFixed(0)}</p>
                <p>{typeof(this.state.dateDay)}</p>
            </div>
        );
    }
}
