import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';
import { getJwt } from '../helpers/jwt';

export default class UserEdit extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <Jumbotron>
                <br/>
                <h1> Edytuj danee</h1>
                </Jumbotron>
            </div>
        )
    }
}