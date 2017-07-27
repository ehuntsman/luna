import React, { Component } from 'react';
import rulesheader from './rulesheader.jpg';
import {Link} from 'react-router-dom';

class StartStory extends Component {
    render() {
        return (
            <div className="story-intro">
                <div className="story-body">
                    <div className="story-intro-hero">
                        {/*<img src={header} alt="there are other worlds than these"/>*/}
                        <div className="otherworldstitle">
                            <h2 className="there-these">There are</h2>
                            <h1 className="other-worlds">Other Worlds</h1>
                            <h2 className="there-these">than these.</h2>
                        </div>
                    </div>

                    <h3>...and they are starting to collide.</h3>
                    <p>Only the fabled Crystal from Luna can stop the universes from folding in on eachother.</p>
                    <p>Many are after the Luna and it's power.</p>
                    <p>Gather a team.</p>
                    <p>Fight those in your way.</p>
                    <p>Find the Luna first.</p>
                    <h3>Good Luck</h3>
                </div>
                <div className="story-rules">
                    <img src={rulesheader} alt="rules"/>
                    <h1>How to Play</h1>
                    <p>these are the instructions on how to play</p>
                    <ul>
                        <li>Make a team</li>
                        <li>fight</li>
                        <li>vlah blah write later</li>
                    </ul>
                </div>
                <div className="story-start">
                    <h1>Dying to play?</h1>
                    <h3>We highly suggest you create an account so you can save your team and create new team members</h3>
                    <p>You can play without it if you must</p>
                    <a href="http://localhost:3000/auth"><button>Log in to save your team</button></a>
                    <Link to="/myteam">
                        <button>Whatever. Give me a team to play with!</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default StartStory;