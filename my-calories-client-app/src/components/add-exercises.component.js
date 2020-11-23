import React , { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { getJwt } from '../helpers/jwt';

export default class AddExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeKcalperhour = this.onChangeKcalperhour.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userId: '',
            description: '',
            duration:0,
            kcalperhour:0,
            date: new Date()
        }
    }

    componentDidMount() {
        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/users/getUser',
        {headers: { Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data._id);
            this.setState({
                userId: res.data._id
            });
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeKcalperhour(e){
        this.setState({
            kcalperhour: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const exercise = {
            userId: this.state.userId,
            description: this.state.description,
            duration: this.state.duration,
            kcalperhour: this.state.kcalperhour,
            date: this.state.date
        }

        console.log(exercise);

        const tokenjwt = getJwt();

        axios.post('http://localhost:5000/exercises/add',
        exercise,{
            headers: { 
                Authorization: `Bearer ${tokenjwt}`
            }
        })
        .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <br/>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Opis ćwiczenia: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                    <label>Ilość kalorii na godzine: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.kcalperhour}
                        onChange={this.onChangeKcalperhour}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>
            
                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            )
    }
}