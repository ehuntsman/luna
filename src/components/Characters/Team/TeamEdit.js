import React, { Component } from 'react';
import {connect} from 'react-redux';
import CurrentTeam from './CurrentTeam';
import CharacterList from './CharacterList';

import {updateTeamName} from '../../../ducks/reducer';

class TeamEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: "",
            selectedChar: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            userInput: e.target.value
        })
    }
    updateTeamName(name) {
        this.setState({
            userInput: ""
        })
        this.props.updateTeamName(name);
    }
    render() {
        return (
            <div className="edit-team-container">
                <h1>{this.props.name}</h1>
                <input type="text" onChange={this.handleChange} placeholder="change your teamname" value={this.state.userInput}/>
                <button onClick={()=>this.updateTeamName(this.state.userInput)}>submit new team name</button>
                <CurrentTeam/>
                <CharacterList/>
                <button>save team</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        name: state.teamName,
        team: state.team,
        story: state.storyPoint,
        characters: state.characters
    }
}

export default connect(mapStateToProps, {updateTeamName})(TeamEdit);