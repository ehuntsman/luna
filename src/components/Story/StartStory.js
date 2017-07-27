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
                            <h2 className="there-these1">There are</h2>
                            <h1 className="other-worlds">Other Worlds</h1>
                            <h2 className="there-these2">than these.</h2>
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
                    <h1>Notes for Playing</h1>
                    <ul>
                        <li>Special Attacks are powerful, but come with a cooldown</li>
                        <li>Beware of elements and how they effect eachother</li>
                    </ul>
                </div>
                <div className="story-start">
                    <h1>Dying to play?</h1>
                    <a href="http://localhost:3000/auth"><button>Log in to create your team</button></a>
                </div>
            </div>
        );
    }
}

export default StartStory;