import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

const Exercise = props => (
<tr>
  <td>{props.exercise.description}</td>
  <td>{props.exercise.duration}</td>
  <td>{props.exercise.date.substring(0,10)}</td>
  <td>
    <Link to={"/exercise/edit/"+props.exercise._id}>edit</Link> | <a href="!#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
  </td>
</tr>
)

export default class GetExercisesDiary extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
          pickedDate : new Date(),
          exercises: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({exercises: response.data});
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

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise = {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;

        })
    }

    onChangeDate(date){
      this.setState({
        pickedDate: date
      });
    }

    render() {
        return (
          <div>
            <NavbarMenu/>
            <AuthenticatedComponent/>
            <br/>
              <h3>Logged Exercises</h3>
              <div className="form-group">
              <label>Data: </label>
                  <DatePicker 
                  selected={this.state.pickedDate}
                  onChange={this.onChangeDate}
                  />
              </div>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Opis</th>
                    <th>Czas trwania</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.exerciseList() }
                </tbody>
              </table>
          </div>
        )
    }
}