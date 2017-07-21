import React, { Component } from 'react';
import {updateCurrentTeam} from '../../../ducks/reducer';
import {connect} from 'react-redux';

class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultArray: [2,6,8,9,10]
        }
        this.switchEmOut = this.switchEmOut.bind(this);
    }
    switchEmOut(a,b,c){
        this.props.updateCurrentTeam(a,b,c)
    }



//////// display chars in order
    render() {
        let cake = "";
        if(this.props.selectedChar){
            cake = this.props.selectedChar
        }else{
            cake = "dance"
        }
        if(this.props.user){
            let temparray = this.props.user.currentteam;
            let chararray = [];
            for(var j = 0; j < temparray.length; j++){
                for(var i = 0; i < this.props.characters.length; i++){
                    if(this.props.characters[i].id == temparray[j]){
                        chararray.push(this.props.characters[i]);
                    }
                }
            }
            console.log(chararray, "yo yo yo this is the chararray BRO!")
            let finalarray = chararray.map( (character, i) => {
                return (
                    <div className="member" key={i}>
                        <div className="level-element">
                            <div className="level">
                                <p>level</p>
                            </div>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
                        <img src={character.imageurl} />
                        <h4>{character.name}</h4>
                        <button onClick={()=>this.switchEmOut(cake.id, i, this.props.user)}>Switch with {cake.name}</button>
                    </div>
                )
            })
            return (
                <div className="current-team-container">
                    {finalarray}
                </div>
            );
        }else{
            let defaultCharArray = [];
            for(var x = 0; x < this.props.characters.length; x++){
                for(var t = 0; t < this.state.defaultArray.length; t++){
                    if(this.props.characters[x].id == this.state.defaultArray[t]){
                        defaultCharArray.push(this.props.characters[x]);
                    }
                }
            }
            let defaulty = defaultCharArray.map( (character, i) => {
                return (
                    <div className="member">
                        <div className="level-element">
                            <div className="level">
                                <p>level</p>
                            </div>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
                        <img src={character.imageurl} />
                        <h4>{character.name}</h4>
                    </div>
                )
            })
            return (
                <div className="current-team-container">
                    {defaulty}
                    default
                </div>
            );
        }
    }
}

export default connect(null, {updateCurrentTeam})(CurrentTeam);