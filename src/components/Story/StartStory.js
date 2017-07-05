import React, { Component } from 'react';
import header from './otherworldsheader.jpg';
import rulesheader from './rulesheader.jpg';
import {Link} from 'react-router-dom';

class StartStory extends Component {
    render() {
        return (
            <div className="story-intro">
                <div className="story-body">
                    <img src={header} alt="there are other worlds than these"/>
                    <h1>There are other worlds than these....</h1>
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
                    <button>Create an account to save your team</button>
                    <Link to="/myteam">
                        <button>Whatever. Let me make my team!</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default StartStory;