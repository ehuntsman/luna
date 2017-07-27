import React, { Component } from 'react';
import {connect} from 'react-redux';
import CurrentTeam from './CurrentTeam';
import CharacterList from './CharacterList';
import {Link} from 'react-router-dom';

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
    switchEmOut(a,b,c){
        this.props.updateCurrentTeam(a,b,c)
    }
    componentDidMount() {
        this.props.getCharacters()
        this.props.getUserInfo()
    }
    // componentDidUpdate(prevprops){
    //     if(prevprops.loggedIn.teamname !== this.props.loggedIn.teamname){
    //         setTimeout(() => {
    //          this.props.getUserInfo()
    //         },1)
    //     }else{
    //         console.log(prevprops,  "next props FAILLLLLLLL")
    //     }
    // }

    render() {
        console.log(this.props.loggedIn.teamname, "this is the new teamname from state");
        if(this.props.loggedIn && this.props.loggedIn.username){
            return (
                <div className="edit-team-container">
                    <p>logged {this.props.loggedIn.username}</p>
                    <h1>{this.props.loggedIn.teamname}</h1>
                    <input type="text" onChange={(e)=>this.handleChange(e.target.value)} placeholder="change your teamname" value={this.state.userInput}/>
                    <button onClick={()=>this.updateTeamName(this.props.loggedIn, this.state.userInput)}>submit new team name</button>
                    <CurrentTeam characters={this.props.characters} user={this.props.loggedIn} selectedChar={this.props.selectedChar} switchEmOut={this.switchEmOut}/>
                    <div className="button-container">
                        <Link to="/storymap"><button>Let's go fight!</button></Link>
                    </div>
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
                    <hr/>
                    <hr/>
                    <hr/>
                    not logged in shouldn't be here
                    <CharacterList characters={this.props.characters}/>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        story: state.storyPoint,
        characters: state.characters,
        loggedIn: state.loggedIn,
        selectedChar: state.selectedChar
    }
}

export default connect(mapStateToProps, {updateTeamName, getCharacters, getUserInfo, updateCurrentTeam})(TeamEdit);