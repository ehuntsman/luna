import React, { Component } from 'react';
import axios from 'axios';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: 'nothin'
        }
        this.getUser = this.getUser.bind(this);
    }

    getUser() {

        axios.get('/api/user')
        .then( res => {
            console.log(res);
            this.setState({
                info: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>test</h1>
                <a href='http://localhost:3000/auth'>log in</a>
                <button onClick={this.getUser}>go get user</button>
                {
                    JSON.stringify(this.state.info, null, 2)
                }
            </div>
        )
    }
}