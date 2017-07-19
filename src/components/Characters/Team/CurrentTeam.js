import React, { Component } from 'react';
import {connect} from 'react-redux';


class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTeamOne: 2,
            currentTeamTwo: 6,
            currentTeamThree: 8,
            currentTeamFour: 9,
            currentTeamFive: 10
        }
    }

    componentDidMount() {
        if(this.props.loggedIn){
            console.log(this.props.loggedIn.id, "this is the user id man");
        }
    }

    render() {
        return (
            <div className="current-team-container">
                <div className="member" key={this.props.currentTeamOne.id}>
                    <img src={this.props.currentTeamOne.imageurl} placeholder={this.props.currentTeamOne.name} alt={this.props.currentTeamOne.name} />
                    <h4>{this.props.currentTeamOne.name}</h4>
                    <div className="level-element">
                        <div className="level">
                            <p>i</p>
                        </div>
                        <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${this.props.currentTeamOne.elementname}.png`} alt="element"/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        name: state.reducer.teamName,
        story: state.reducer.storyPoint,
        loggedIn: state.userLoginReducer.loggedIn,
        currentTeamOne: state.reducer.currentTeamOne,
        currentTeamTwo: state.reducer.currentTeamTwo,
        currentTeamThree: state.reducer.currentTeamThree,
        currentTeamFour: state.reducer.currentTeamFour,
        currentTeamFive: state.reducer.currentTeamFive,
    }
}

export default connect(mapStateToProps, {})(CurrentTeam);