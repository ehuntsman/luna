import React, { Component } from 'react';
import {connect} from 'react-redux';
import CurrentTeam from './CurrentTeam';
import CharacterList from './CharacterList';

import {updateTeamName} from '../../../ducks/reducer';
import {getUserInfo} from '../../../ducks/user';

class TeamEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: "",
            selectedChar: {},
            user: {}
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
    // componentWillRecieveProps(nextProps){
    //     if(this.props.loggedIn !== nextProps.loggedIn) {
    //         this.props.loggedInAreWe();
    //     }
    // }
    // componentDidMount(){
    //     console.log(this.props.loggedIn, 'getting logged in')
    //     this.props.loggedInAreWe();
    // }
    componentDidMount() {
        this.props.getUserInfo().then((e) => {
            console.log(e, "this is e mother effers!")
            this.setState({user: e});
        })
    }
    componentWillRecieveProps(nextprops){
        if(this.props.loggedIn.username !== nextprops.loggedIn.username){
            this.props.getUserInfo().then(() => {
                this.setState({user: this.props.loggedIn});
            })
        }
    }
    render() {
        console.log(this.props, "logged in");
        if(this.props.loggedIn){
            return (
                <div className="edit-team-container">
                    <p>logged {this.state.user.username}</p>
                    <h1>{this.props.name}</h1>
                    <input type="text" onChange={this.handleChange} placeholder="change your teamname" value={this.state.userInput}/>
                    <button onClick={()=>this.updateTeamName(this.state.userInput)}>submit new team name</button>
                    <CurrentTeam/>
                    <CharacterList/>
                    <button>save team</button>
                </div>
            );
        }else{
            console.log(this.props, "logged in props all");
            return(
                <div className="edit-team-container">

                    <p>not logged</p>

                    <h1>Log in to create and customize your team</h1>
                    <CurrentTeam/>
                    <hr/>
                    <p> temp list for what logged in sees</p>
                    <h1>{this.props.name}</h1>
                    <input type="text" onChange={this.handleChange} placeholder="change your teamname" value={this.state.userInput}/>
                    <button onClick={()=>this.updateTeamName(this.state.userInput)}>submit new team name</button>
                    <CharacterList/>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        name: state.reducer.teamName,
        team: state.reducer.team,
        story: state.reducer.storyPoint,
        characters: state.reducer.characters,
        loggedIn: state.userLoginReducer.loggedIn,
        selectedChar: state.reducer.selectedChar
    }
}

export default connect(mapStateToProps, {updateTeamName, getUserInfo})(TeamEdit);