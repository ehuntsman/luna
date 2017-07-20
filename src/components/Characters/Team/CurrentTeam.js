import React, { Component } from 'react';
import {connect} from 'react-redux';


class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultArray: [2,6,8,9,10]
        }
    }

    render() {
        if(this.props.user){
            console.log(this.props.characters, "current team yo banananananana")
            let temparray = this.props.user.currentteam;
            let chararray = [];
            for(var i = 0; i < this.props.characters.length; i++){
                for(var j = 0; j < temparray.length; j++){
                    if(this.props.characters[i].id === temparray[j]){
                        chararray.push(this.props.characters[i]);
                    }
                }
            }
            let finalarray = chararray.map( (character, i) => {
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
                    {finalarray}
                </div>
            );
        }else{
            let defaultCharArray = [];
            for(var i = 0; i < this.props.characters.length; i++){
                for(var j = 0; j < this.state.defaultArray.length; j++){
                    if(this.props.characters[i].id == this.state.defaultArray[j]){
                        defaultCharArray.push(this.props.characters[i]);
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
                </div>
            );
        }
    }
}


export default CurrentTeam;