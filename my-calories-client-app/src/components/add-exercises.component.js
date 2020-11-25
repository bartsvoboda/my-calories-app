import React , { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

import {Col, Button, Form, Jumbotron} from 'react-bootstrap';

export default class AddExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeKcalperhour = this.onChangeKcalperhour.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let todayDate = new Date();

        this.state = {
            userId: '',
            description: '',
            duration:0,
            kcalperhour:0,
            DateYear: todayDate.getFullYear(),
            DateMonth: todayDate.getMonth()+1,
            DateDay: todayDate.getDate()
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:5000/users/')
    //     .then(response => {
    //         if(response.data.length > 0){
    //             this.setState({
    //                 users: response.data.map(user => user.username),
    //                 username: response.data[0].username
    //             })
    //         }
    //     })
    // }

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
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            kcalperhour: this.state.kcalperhour,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise )
        .then(res => console.log(res.data));
    }

    render() {
        return (
            <Form>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <Jumbotron>
                    <center><h3>Dodaj ćwiczenie</h3></center>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridExerciseName">
                        <Form.Label>Nazwa ćwiczenia</Form.Label>
                        <Form.Control type="text" placeholder="Nazwa ćwiczenia" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDuration">
                        <Form.Label>Czas trwania (minuty)</Form.Label>
                        <Form.Control type="number" placeholder="Czas trwania" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridKcalPerHour">
                        <Form.Label>Ilość kalorii na godzinę</Form.Label>
                        <Form.Control type="number" placeholder="Ilość kalorii" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Rok</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
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
                        <Form.Control as="select" defaultValue="Choose...">
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
                        <Form.Control as="select" defaultValue="Choose...">
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
                        Dodaj ćwiczenie
                    </Button>
                </Jumbotron>
            </Form>
        )
    }
}