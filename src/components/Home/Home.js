import React, { Component } from 'react';
import logo from './lunaquest.png';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <img src={logo} className="home-logo" alt="logo" />
                <Link to="/start" id="new-story-button">
                    <button className="black-button">Start a New Quest</button>
                </Link>
                <button className="black-button">Log In</button>
            </div>
        );
    }
}

export default Home;