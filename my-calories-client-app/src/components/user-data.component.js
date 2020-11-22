import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

export default class UserData extends Component {
    render() {
        return (
            <div>
                <AuthenticatedComponent/>
                <NavbarMenu/>
                <br/>
                <h1>moje dane</h1>
            </div>
        )
    }
}