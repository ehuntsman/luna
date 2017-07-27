import React, { Component } from 'react';
import logo from './logo-01.png';
import cloud from './cloud.png';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <div className="clouds-wrapper">
                    <div className="cloud first">
                        <img src={cloud} className="cloud1" alt="cloud" />
                        <img src={cloud} className="cloud2" alt="cloud" />
                    </div>
                </div>
                <div className="home-container">
                    <img src={logo} className="home-logo" alt="logo" />
                    <div className="home-links">
                        <Link to="/start" id="new-story-button">
                            <button>Start a New Quest</button>
                        </Link>
                        <a href="http://localhost:3000/auth"><button>Log In</button></a>
                        <p>or</p>
                        {/*if signed in*/}
                        <button>Continue</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;