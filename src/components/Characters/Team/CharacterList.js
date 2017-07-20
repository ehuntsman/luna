import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCharacters} from '../../../ducks/reducer.js';
import {Link} from 'react-router-dom';

class CharacterList extends Component {
    constructor(props){
        super(props);
    }

    selectMe(){

    }
    render() {
        return (
            <div className="all-characters-container">
                <h1>character list component</h1>
                <p>if you click one of me, then one above, it will replce the one above</p>
                <p>if a character is on your current team, then it will be greyed out/disabled on this list</p>

                {this.props.characters.map( (element) => {
                    return(
                        <div className="char-box" key={element.id}>
                            <img src={element.imageurl} placeholder={element.name} alt={element.name} />
                            <p>{element.name}<br/>
                            <Link to={`/characters/${element.id}`}><button>profile</button></Link>
                            <button onClick={()=>this.selectMe(element.id)}>select</button></p>
                            <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${element.elementname}.png`} alt="element" />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default CharacterList;