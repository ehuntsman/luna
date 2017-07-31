import React, { Component } from 'react';
// import axios from 'axios';

class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultArray: [2,6,8,9,10]
        }
    }

    render() {
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
            // const url = `/api/progress/${this.props.user.id}`
            // const promise = axios.get(url).then(response => response.data);
            let finalarray = chararray.map( (character, i) => {
                return (
                    <div className="member" key={i}>
                        <div className="level-element">
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
                        <img src={character.framed} alt={character.name} />
                        <h4 className="large">{character.name}</h4>
                        {
                            this.props.selectedChar.id
                        ?
                            <button onClick={()=>this.props.switchEmOut(this.props.selectedChar.id, i, this.props.user)}>Switch with {this.props.selectedChar.name}</button>
                        :
                            <div></div>
                        }
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
                    <div className="member" key={i}>
                        <div className="level-element">
                            <div className="level">
                                <p>level</p>
                            </div>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${character.elementname}.png`} alt="element"/>
                        </div>
                        <img src={character.framed} alt={character.name}/>
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

export default (CurrentTeam);