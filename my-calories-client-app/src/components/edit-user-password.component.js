import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

export default class UserPasswordEdit extends Component {
    render() {
        return (
            <div>
            <NavbarMenu/> 
            <AuthenticatedComponent/>
            <br/>
                <h1> Edytuj hasło</h1>
            </div>
        )
    }
}