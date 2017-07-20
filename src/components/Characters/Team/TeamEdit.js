import React, { Component } from 'react';
import {connect} from 'react-redux';
import CurrentTeam from './CurrentTeam';
import CharacterList from './CharacterList';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { batchActions } from 'redux-batched-actions';

import {updateTeamName, getCharacters} from '../../../ducks/reducer';
import {getUserInfo} from '../../../ducks/user';
import Test from './../../Test';

class TeamEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: ""
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
    componentDidMount() {
        batchActions([
            this.props.getUserInfo(),
            this.props.getCharacters(),
        ])


    }

    getUser() {
        axios.get('/api/myteam').then( res => {
            console.log(res)
        })
    }
    render() {
        if(this.props.loggedIn.username){
            return (
                <div className="edit-team-container">
                    <p>logged {this.props.loggedIn.username}</p>
                    <h1>{this.props.name}</h1>
                    <input type="text" onChange={this.handleChange} placeholder="change your teamname" value={this.state.userInput}/>
                    <button onClick={()=>this.updateTeamName(this.state.userInput)}>submit new team name</button>
                    <CurrentTeam user={this.props.loggedIn} characters={this.props.characters}/>
                    <div className="button-container">
                        <Link to="/storymap"><button>Let's go fight!</button></Link>
                    </div>
                    <button>save team</button>
                    <p>team should always be saved on clicks?</p>
                    <CharacterList characters={this.props.characters}/>
                </div>
            );
        }else{
            return(
                <div className="edit-team-container">
                    <h1>Log in to create and customize your team</h1>
                    <h3>Otherwise, feel free to use this team!</h3>
                    <CurrentTeam characters={this.props.characters} />
                    <div className="button-container">
                        <Link to="/storymap"><button>Let's go fight!</button></Link>
                    </div>
                    <hr/>
                    <CharacterList characters={this.props.characters}/>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        name: state.reducer.teamName,
        story: state.reducer.storyPoint,
        characters: state.reducer.characters,
        loggedIn: state.userLoginReducer.loggedIn,
        selectedChar: state.reducer.selectedChar
    }
}

export default connect(mapStateToProps, {updateTeamName, getUserInfo, getCharacters})(TeamEdit);