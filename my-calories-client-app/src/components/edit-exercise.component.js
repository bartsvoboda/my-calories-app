import React , { Component } from 'react';
import axios from 'axios';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

import {Col, Button, Form, Jumbotron} from 'react-bootstrap';
import { getJwt } from '../helpers/jwt';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeKcalperhour = this.onChangeKcalperhour.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let todayDate = new Date();


        this.state = {
            exerciseId: '',
            description: '',
            duration:0,
            kcalperhour:0,
            dateYear: todayDate.getFullYear(),
            dateMonth: todayDate.getMonth()+1,
            dateDay: todayDate.getDate()
        }
    }

    componentDidMount() {
        const tokenjwt = getJwt();
        console.log(this.props.match.params.id);

        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id,
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data._id);
            this.setState({
                exerciseId: res.data._id,
                description: res.data.description,
                duration: res.data.duration,
                kcalperhour: res.data.kcalperhour
            });  
            console.log(typeof(res.data.dateDay));         
        })

        console.log(this.state.dateDay);
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

    onChangeYear(e){
        this.setState({
            dateYear: e.target.value
        });
    }

    onChangeMonth(e){
        this.setState({
            dateMonth: e.target.value
        });
    }

    onChangeDay(e){
        this.setState({
            dateDay: e.target.value
        });
        
    }

    onSubmit(e) {
        e.preventDefault();
        const tokenjwt = getJwt();
        const exercise = {
            description: this.state.description,
            duration: this.state.duration,
            kcalperhour: this.state.kcalperhour,
            dateYear: this.state.dateYear,
            dateMonth: this.state.dateMonth,
            dateDay: this.state.dateDay
        }
        

        console.log(typeof(exercise.dateDay));

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise, {
            headers: {
                Authorization: `Bearer ${tokenjwt}`
            }
        })
        .then(res => console.log(res.data));

        this.props.history.push('/diary');
        window.location.reload();
    }

    render() {
        // stringDay = parse
        // stringMonth = 
        // stringYear = 

        return (
            <Form onSubmit = {this.onSubmit}>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <Jumbotron>
                    <center><h3>Zaktualizuj ćwiczenie</h3></center>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridExerciseName">
                        <Form.Label>Nazwa ćwiczenia</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nazwa ćwiczenia"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDuration">
                        <Form.Label>Czas trwania (minuty)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Czas trwania"
                            required 
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridKcalPerHour">
                        <Form.Label>Ilość kalorii na godzinę</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ilość kalorii"
                            required
                            value={this.state.kcalperhour}
                            onChange={this.onChangeKcalperhour} 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Rok</Form.Label>
                        <Form.Control as="select" defaultValue={this.state.dateYear} onChange={this.onChangeYear} >
                            <option value = "2020">2020</option>
                            <option value = "2021">2021</option>
                            <option value = "2022">2022</option>
                            <option value = "2023">2023</option>
                            <option value = "2024">2024</option>
                            <option value = "2025">2025</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMonth">
                        <Form.Label>Miesiąc</Form.Label>
                        <Form.Control as="select" defaultValue={this.state.dateMonth} onChange={this.onChangeMonth} type="number">
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                            <option value = "6">6</option>
                            <option value = "7">7</option>
                            <option value = "8">8</option>
                            <option value = "9">9</option>
                            <option value = "10">10</option>
                            <option value = "11">11</option>
                            <option value = "12">12</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDay">
                        <Form.Label>Dzień</Form.Label>
                        <Form.Control as="select" defaultValue={this.state.dateDay}  onChange={this.onChangeDay} >
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                            <option value = "6">6</option>
                            <option value = "7">7</option>
                            <option value = "8">8</option>
                            <option value = "9">9</option>
                            <option value = "10">10</option>
                            <option value = "11">11</option>
                            <option value = "12">12</option>
                            <option value = "13">13</option>
                            <option value = "14">14</option>
                            <option value = "15">15</option>
                            <option value = "16">16</option>
                            <option value = "17">17</option>
                            <option value = "18">18</option>
                            <option value = "19">19</option>
                            <option value = "20">20</option>
                            <option value = "21">21</option>
                            <option value = "22">22</option>
                            <option value = "23">23</option>
                            <option value = "24">24</option>
                            <option value = "25">25</option>
                            <option value = "26">26</option>
                            <option value = "27">27</option>
                            <option value = "28">28</option>
                            <option value = "29">20</option>
                            <option value = "30">30</option>
                            <option value = "31">31</option>
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Zaktualizuj ćwiczenie
                    </Button>
                </Jumbotron>
            </Form>
        )
    }
}