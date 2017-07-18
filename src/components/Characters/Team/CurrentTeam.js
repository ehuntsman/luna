import React, { Component } from 'react';
import {connect} from 'react-redux';


class CurrentTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTeam: []
        }
    }
    render() {
        return (
            <div className="current-team-container">
                {this.props.characters.map( (char) => {
                    return(
                        <div className="member" key={char.id}>
                            <img src={char.imageurl} placeholder={char.name} alt={char.name} />
                            <h4>{char.name}</h4>
                            <div className="level-element">
                                <div className="level">
                                    <p>{char.level}</p>
                                </div>
                                <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${char.elementname}.png`} alt="element"/>
                            </div>
                        </div>
                    )
                })}
                <p>this component should be used anytime your current team comes up in game</p>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        name: state.reducer.teamName,
        characters: state.reducer.team,
        story: state.reducer.storyPoint
    }
}

export default connect(mapStateToProps, {})(CurrentTeam);