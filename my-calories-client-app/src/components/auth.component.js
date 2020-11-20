import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt';

export default class AuthenitcatedComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined
        }
    }

    componentDidMount(){
        const jwt = getJwt();
        if(!jwt) {
            this.props.history.push('/');
        }

        axios.get
    }


    render() {
        return(
            <div>
                siemka
            </div>
        )
    }
}