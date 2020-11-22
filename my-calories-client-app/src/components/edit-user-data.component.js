import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

export default class UserDataEdit extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <br/>
                <h1> Edytuj dane</h1>
            </div>
        )
    }
}