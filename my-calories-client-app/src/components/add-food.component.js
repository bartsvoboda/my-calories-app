import React , { Component } from 'react';
import axios from 'axios';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

import {Col, Button, Form, Jumbotron} from 'react-bootstrap';
import { getJwt } from '../helpers/jwt';

export default class AddFood extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeProteins = this.onChangeProteins.bind(this);
        this.onChangeCarbohydrates = this.onChangeCarbohydrates.bind(this);
        this.onChangeFats = this.onChangeFats.bind(this);
        this.onChangeKcals = this.onChangeKcals.bind(this);
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let todayDate = new Date();

        this.state = {
            userId: '',
            name: '',
            weight:0,
            proteins:0,
            carbohydrates:0,
            fats:0,
            kcals:0,
            dateYear: todayDate.getFullYear(),
            dateMonth: todayDate.getMonth()+1,
            dateDay: todayDate.getDate()
        }
    }

    componentDidMount() {
        const tokenjwt = getJwt();

        axios.get('http://localhost:5000/users/getUser',
        {headers: {Authorization: `Bearer ${tokenjwt}`}})
        .then(res => {
            console.log(res.data._id);
            this.setState({
                userId: res.data._id
            })            
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeWeight(e){
        this.setState({
            weight: e.target.value
        });
    }

    onChangeProteins(e){
        this.setState({
            proteins: e.target.value
        });
    }

    onChangeCarbohydrates(e){
        this.setState({
            carbohydrates: e.target.value
        });
    }

    onChangeFats(e){
        this.setState({
            fats: e.target.value
        });
    }

    onChangeKcals(e){
        this.setState({
            kcals: e.target.value
        });
    }

    onChangeUserId(e){
        this.setState({
            user_id: e.target.value
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
        const food = {
            name: this.state.name,
            weight: this.state.weight,
            proteins: this.state.proteins,
            carbohydrates: this.state.carbohydrates,
            fats: this.state.fats,
            kcals: this.state.kcals,
            dateYear: this.state.dateYear,
            dateMonth: this.state.dateMonth,
            dateDay: this.state.dateDay
        }

        console.log(food);

        axios.post('http://localhost:5000/foods/add', food, {
            headers: {
                Authorization: `Bearer ${tokenjwt}`
            }
        })
        .then(res => console.log(res.data));

        this.props.history.push("/user/status");
    }


    
    render() {
        return (
            <Form onSubmit = {this.onSubmit}>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <Jumbotron>
                    <center><h3>Dodaj produkt</h3></center>
                    <br/>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFoodName">
                        <Form.Label>Nazwa produktu</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nazwa produktu"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFoodWeight">
                        <Form.Label>Waga produktu (w gramach na 100 gram)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Czas trwania"
                            required 
                            value={this.state.weight}
                            onChange={this.onChangeWeight}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFoodProteins">
                        <Form.Label>Ilość białka (na 100 gram)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ilość białka"
                            required
                            value={this.state.proteins}
                            onChange={this.onChangeProteins}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFoodCarbohydrates">
                        <Form.Label>Ilość węglowodanów (na 100 gram)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ilość węglowodanów"
                            required 
                            value={this.state.carbohydrates}
                            onChange={this.onChangeCarbohydrates}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFoodFoods">
                        <Form.Label>Ilość tłuszczu (na 100 gram)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ilość tłuszczu"
                            required 
                            value={this.state.fats}
                            onChange={this.onChangeFats}
                            />
                        </Form.Group>
                    </Form.Row>


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
                        Dodaj ćwiczenie
                    </Button>
                </Jumbotron>
            </Form>
        )
    }
}