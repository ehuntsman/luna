import React, { Component } from 'react';
import {connect} from 'react-redux';
import CurrentTeam from './CurrentTeam';
import CharacterList from './CharacterList';
import {Link} from 'react-router-dom';
import config from './../../../config.js';

import {updateTeamName, getCharacters, getUserInfo, updateCurrentTeam} from '../../../ducks/reducer';

class TeamEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.switchEmOut = this.switchEmOut.bind(this);
    }
    handleChange(val){
        this.setState({
            userInput: val
        })
    }
    updateTeamName(user, name) {
        this.setState({
            userInput: "",
        })
        setTimeout(() => {
            this.props.updateTeamName(user, name)
        }, 1)
    }
    switchEmOut(a,b){
        this.props.updateCurrentTeam(a,b)
    }
    componentDidMount() {
        this.props.getCharacters()
        this.props.getUserInfo()
    }

    render() {
        console.log(this.props.currentteam, "*******this is current team")
        // if(this.props.loggedIn && this.props.loggedIn.username){
            return (
                <div className="edit-team-container">
                    {/* <h1>{this.props.loggedIn.teamname}</h1> */}
                    {/* <input type="text" onChange={(e)=>this.handleChange(e.target.value)} placeholder="change your teamname" value={this.state.userInput}/> */}
                    {/* <button onClick={()=>this.updateTeamName(this.props.loggedIn, this.state.userInput)}>submit new team name</button> */}
                    <CurrentTeam characters={this.props.characters} team={this.props.currentteam} selectedChar={this.props.selectedChar} switchEmOut={this.switchEmOut}/>
                    <div className="button-container">
                        <Link to="/storymap"><button>Let's go fight!</button></Link>
                    </div>
                    <CharacterList characters={this.props.characters}/>
                </div>
            );
        // }else{
            // return(
            //     <div className="edit-team-container not-logged">
            //         <h1>Log in to create and customize your team</h1>
            //         <a href={config.logIn}><button>Sign in</button></a>
            //     </div>
            // );
        // }
    }
}

function mapStateToProps(state){
    return{
        story: state.storyPoint,
        characters: state.characters,
        loggedIn: state.loggedIn,
        selectedChar: state.selectedChar,
        currentteam: state.currentteam
    }
}

export default connect(mapStateToProps, {updateTeamName, getCharacters, getUserInfo, updateCurrentTeam})(TeamEdit);