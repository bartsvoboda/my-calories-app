import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

export default class UserDeleteAccount extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <h1> Usuń Konto</h1>
            </div>
        )
    }
}