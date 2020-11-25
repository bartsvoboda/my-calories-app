import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import {Col, Button, Form, Jumbotron} from 'react-bootstrap';

import CaloriesDailyDiary from './calories-diary.component';

import { getJwt } from '../helpers/jwt';
import { getReqCalories} from '../helpers/calories';

const Exercise = props => (
    <tr>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.kcalperhour}</td>
        <td>{(props.exercise.kcalperhour)*(props.exercise.duration/60).toPrecision(1)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edytuj</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Usuń</a>
        </td>
    </tr>
)

const Food = props => (
    <tr>
        <td>{props.food.name}</td>
        <td>{props.food.weight}</td>
        <td>{props.food.proteins}</td>
        <td>{props.food.carbohydrates}</td>
        <td>{props.food.fats}</td>
        <td>{props.food.kcals}</td>
        <td>{(props.food.kcals/100)*props.food.weight}</td>
        <td>
            <a href="#" onClick={() => { props.deleteFood(props.food._id) }}>Usuń</a>
        </td>
    </tr>
)


export default class CaloriesDiary extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        

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
                exercises: res.data.filter(el => el.dateDay === this.state.dateDay 
                    && el.dateMonth === this.state.dateMonth 
                    && el.dateYear === this.state.dateYear)
            })            
        })
        .catch(error => {
            console.log(error);
        })

        axios.get('http://localhost:5000/foods',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data);
            this.setState({
                foods: res.data.filter(el => el.dateDay === this.state.dateDay 
                    && el.dateMonth === this.state.dateMonth 
                    && el.dateYear === this.state.dateYear)
            })            
        })
        .catch(error => {
            console.log(error);
        })



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

    deleteFood(id) {
        axios.delete('http://localhost:5000/foods/'+id)
        .then(response => console.log(response.data));
        this.setState({
            foods: this.state.foods.filter(el => el._id !== id)
        })
    }

    foodsList() {
        return this.state.foods.map(currentfood => {
            return <Food food = {currentfood} deleteFood={this.deleteFood} key={currentfood._id}/>;
        })
    }



    onSubmit(e) {
        e.preventDefault();

        var choosedYear = parseInt(this.state.dateYear);
        var choosedMonth = parseInt(this.state.dateMonth);
        var choosedDay = parseInt(this.state.dateDay);


        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/exercises',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data);
            this.setState({
                exercises: res.data.filter(el => el.dateDay === choosedDay 
                    && el.dateMonth === choosedMonth 
                    && el.dateYear === choosedYear)
            })            
        })
        .catch(error => {
            console.log(error);
        })

        axios.get('http://localhost:5000/foods',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data);
            this.setState({
                foods: res.data.filter(el => el.dateDay === choosedDay 
                    && el.dateMonth === choosedMonth 
                    && el.dateYear === choosedYear)
            })            
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    render(){
        let exerciseSumKcal = this.state.exercises.reduce(function(prev, current){
            return prev + +(current.kcalperhour*((current.duration/60).toPrecision(1)))
        },0);

        let foodSumKcal = this.state.foods.reduce(function(prev, current){
            return prev + +((current.kcals/100) * current.weight)
        },0);

        let proteinSum = this.state.foods.reduce(function(prev,current){
            return prev + + ((current.proteins/100)* current.weight)
        },0);

        let carbohydrateSum = this.state.foods.reduce(function(prev,current){
            return prev + + ((current.carbohydrates/100) * current.weight)
        },0);

        let fatSum = this.state.foods.reduce(function(prev,current){
            return prev + + ((current.fats/100) * current.weight)
        },0);

        let goalCalories = 0;
        goalCalories = parseInt(getReqCalories());


        return(
            <div>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <br/>
                <h2> Wybierz date</h2>
                <Form onSubmit = {this.onSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Rok</Form.Label>
                        <Form.Control as="select" defaultValue={this.state.dateYear} custom onChange={this.onChangeYear}>
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
                        <Form.Control as="select" defaultValue={this.state.dateMonth} custom onChange={this.onChangeMonth}>
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
                        <Form.Control as="select" defaultValue={this.state.dateDay} custom onChange={this.onChangeDay}>
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
                        Pokaż dziennik
                    </Button>
                </Form>

                <br/>

                <Jumbotron>
                    <h3> Dzisiejsze Ćwiczenia</h3>
                    <table className = "table">
                        <thead className = "thead-light">
                            <tr>
                                <th>Nazwa</th>
                                <th>Czas Trwania (minuty)</th>
                                <th>Kcal/godzina</th>
                                <th>Kcal </th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.exercisesList()}
                        </tbody>
                    </table>
                    <p><strong>Suma Kalorii z ćwiczeń </strong> : {exerciseSumKcal.toFixed(1)}</p>
                </Jumbotron>

                <Jumbotron>
                    <h3> Dzisiejsze Posiłki</h3>
                    <table className = "table">
                        <thead className = "thead-light">
                            <tr>
                                <th>Nazwa</th>
                                <th>Waga (gram)</th>
                                <th>Białko (100 gram)</th>
                                <th>Węglowodany (100 gram)</th>
                                <th>Tłuszcze (100 gram)</th>
                                <th>Kcal/100g</th>
                                <th>Kcal</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.foodsList()}
                        </tbody>
                    </table>
                    <br/>
                    <p> Suma Białka: {proteinSum} gram </p>
                    <p> Suma Węglowodanów: {carbohydrateSum} gram</p>
                    <p> Suma Tłuszczy: {fatSum} gram</p>
                    <p><strong>Suma Kalorii z jedzenia </strong> : {foodSumKcal.toFixed(1)}</p>
                </Jumbotron>


                <Jumbotron>
                <h3> Dzisiejszy bilans</h3>
                <p><strong></strong></p>

                <table className = "table">
                        <thead className = "thead-light">
                            <tr>
                                <th><center>Wymagane Kalorie</center></th>
                                <th><center> - </center></th>
                                <th><center>Kalorie z jedzenia</center></th>
                                <th><center> + </center></th>
                                <th><center>Kalorie z ćwiczeń</center></th>
                                <th><center> = </center></th>
                                <th><center> Bilans </center></th>

                            </tr>
                            <tr>
                                <th><center>{goalCalories.toFixed(0)}</center></th>
                                <th><center> - </center></th>
                                <th><center>{foodSumKcal.toFixed(0)}</center></th>
                                <th><center> + </center></th>
                                <th><center>{exerciseSumKcal.toFixed(0)}</center></th>
                                <th><center> = </center></th>
                                <th><center> {(goalCalories - foodSumKcal + exerciseSumKcal).toFixed(0)} </center></th>

                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                </Jumbotron>
            </div>
        );
    }
}
