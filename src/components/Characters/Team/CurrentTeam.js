import React, { Component } from 'react';
import {connect} from 'react-redux';

class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTeam: [],
            teamMemOne: "",
            teamMemTwo: "",
            teamMemThree: "",
            teamMemFour: "",
            teamMemFive: "",
        }
    }
    render() {
        return (
            <div>
                <h1>current team</h1>
                <div className="member">
                    team member 1 - if you click me, then a character below, I will be replaced by the character below
                </div>
                <div className="member">
                    team member 2
                </div>
                <div className="member">
                    team member 3
                </div>
                <div className="member">
                    team member 4
                </div>
                <div className="member">
                    team member 5
                </div>
                <p>this component should be used anytime your current team comes up in game</p>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        name: state.teamName,
        characters: state.team,
        story: state.storyPoint
    }
}

export default connect(mapStateToProps, {})(CurrentTeam);