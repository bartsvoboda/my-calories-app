import React , { Component } from 'react';
import axios from 'axios';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { Button, Jumbotron, Form} from 'react-bootstrap';
import { getJwt } from '../helpers/jwt';



export default class UserDeleteAccount extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e){
        e.preventDefault();

        const tokenjwt = getJwt();
    
        axios.delete('http://localhost:5000/users/deleteUser',{
            headers: {
                Authorization: `Bearer ${tokenjwt}`
            }
        })
       .then(res => console.log(res.data));
        localStorage.removeItem('jwt-token');
        this.props.history.push("/");
        window.location.reload();
        
    }


    render() {
        return (
            <div>
                <Form onSubmit = {this.onSubmit}>
                    <NavbarMenu/>
                    <AuthenticatedComponent/>
                    <Jumbotron>
                        <h1>Usuń konto!</h1>
                        <p>
                            <h3>Jeżeli chcesz usunąc konto naciśnij poniższy przycisk </h3>
                        </p>
                        <p>
                            <h3>!!! Uwaga operacja jest nieodwaracalna !!! </h3>
                        </p>
                        <br/>
                        <p>
                            <Button variant="primary" type="submit">Usuń konto</Button>
                        </p>
                    </Jumbotron>
                </Form>                       
            </div>
        )
    }
}