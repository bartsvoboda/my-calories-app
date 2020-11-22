import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';
import AuthenticatedComponent from './auth.component';

export default class GetFoodDiary extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <AuthenticatedComponent/>
                <br/>
                <h1> Twoje jedzenie</h1>
            </div>
        )
    }
}