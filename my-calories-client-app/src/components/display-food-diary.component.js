import React , { Component } from 'react';

import NavbarMenu from './navbarmenu.component';

export default class GetFoodDiary extends Component {
    render() {
        return (
            <div>
                <NavbarMenu/>
                <br/>
                <h1> Twoje jedzenie</h1>
            </div>
        )
    }
}