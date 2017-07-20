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
        console.log(a,b,c,"these are the items")
        this.props.updateCurrentTeam(a,b,c);
    }


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
            for(var i = 0; i < this.props.characters.length; i++){
                for(var j = 0; j < temparray.length; j++){
                    if(this.props.characters[i].id == temparray[j]){
                        chararray.push(this.props.characters[i]);
                    }
                }
            }
            let finalarray = chararray.map( (character, i) => {
                return (
                    <div className="member" key={i}>
                        <img src={character.imageurl} />
                        <h4>{character.name}</h4>
                        <div className="level-element">
                            <div className="level">
                                <p>level</p>
                            </div>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
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
                        <img src={character.imageurl} />
                        <h4>{character.name}</h4>
                        <div className="level-element">
                            <div className="level">
                                <p>level</p>
                            </div>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
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