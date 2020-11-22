import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';

export default class UserData extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <br/>
                <h1>moje dane</h1>
            </div>
        )
    }
}