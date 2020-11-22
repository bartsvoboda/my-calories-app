import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';

export default class UserDataEdit extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <br/>
                <h1> Edytuj dane</h1>
            </div>
        )
    }
}