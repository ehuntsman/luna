import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getOneCharacter} from '../../../ducks/reducer.js';
import {Link} from 'react-router-dom';

class CharacterShow extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let tempid = this.props.match.params.id
        this.props.getOneCharacter(tempid);
        // this.props.getElement(this.props.selectedChar.elementid);
    }
    render() {
        return (
            <div className="character-show-container">
                <img src={this.props.selectedChar.imageurl} placeholder={this.props.selectedChar.name} />
                <div className="character-show-text">
                    <h1 className={this.props.selectedChar.color}>{this.props.selectedChar.name}</h1>
                    <p>Special Attack: {this.props.selectedChar.specialattackid}</p>
                    <img src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${this.props.selectedChar.elementname}.png`}/>
                    <p>{this.props.selectedChar.description}</p>
                    <Link to='/myteam'>back to my team</Link>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        characters: state.reducer.characters,
        selectedChar: state.reducer.selectedChar,
        loggedIn: state.userLoginReducer.loggedIn
    }
}
export default connect(mapStateToProps, {getOneCharacter})(CharacterShow);