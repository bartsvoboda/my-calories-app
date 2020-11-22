import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { getJwt } from '../helpers/jwt';
import axios from 'axios';


// const {history} = this.props;

class AutheniticatedComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined
        }
    }

    componentDidMount(){
        const tokenjwt = getJwt();
        if(!tokenjwt) {
            this.props.history.push('/');
        }

        axios.get('http://localhost:5000/users/getUser',
        {headers: { Authorization: `Bearer ${tokenjwt}`}})
        .then(res =>{
            console.log(res.data);
            this.setState({username: res.data})
        })
        .catch(err => {
            localStorage.removeItem('jwt-token');
            this.props.history.push('/')
        });
    }


    render() {
        if(this.state.username === undefined) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter (AutheniticatedComponent);