import React , { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarMenu from './navbarmenu.component';

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
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            weight:0,
            proteins:0,
            carbohydrates:0,
            fats:0,
            kcals:0,
            user_id:'',
            date: new Date()
        }
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

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const food = {
            name: this.state.name,
            weight: this.state.weight,
            proteins: this.state.proteins,
            carbohydrates: this.state.carbohydrates,
            fats: this.state.fats,
            kcals: this.state.kcals,
            user_id: this.state.user_id,
            date: this.state.date
        }

        console.log(food);

        axios.post('http://localhost:5000/foods/add', food)
        .then(res => console.log(res.data));
    }


    
    render() {
        return (
            <div>
                <NavbarMenu/>
                <br/>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Nazwa produktu: </label>
                    <input type = "text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Waga produktu: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.weight}
                        onChange={this.onChangeWeight}
                        />
                    </div>
                    <div className="form-group">
                    <label> Białko (na 100 gram): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.proteins}
                        onChange={this.onChangeProteins}
                        />
                    </div>
                    <div className="form-group">
                    <label> Węglowodany (na 100 gram): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.carbohydrates}
                        onChange={this.onChangeCarbohydrates}
                        />
                    </div>
                    <div className="form-group">
                    <label> Tłuszcze (na 100 gram): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.fats}
                        onChange={this.onChangeFats}
                        />
                    </div>
                    <div className="form-group">
                    <label>UserId: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.user_id}
                        onChange={this.onChangeUserId}
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
                    <input type="submit" value="Create Food Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            )
    }
}