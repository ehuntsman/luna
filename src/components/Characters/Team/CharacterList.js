import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectedOne} from '../../../ducks/reducer';

class CharacterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: {}
        }
        this.selectMe = this.selectMe.bind(this);
    }
    selectMe(char){
        this.props.selectedOne(char)
        this.setState({
            selected: char
        })
    }
    render() {
        return (
            <div className="all-characters-container">
                <h1>character list component</h1>
                <p>if you click one of me, then one above, it will replce the one above</p>
                <p>if a character is on your current team, then it will be greyed out/disabled on this list</p>

                {this.props.characters.map( (element, index) => {
                    return(
                        <div className="char-box" key={index}>
                            <img src={element.imageurl} placeholder={element.name} alt={element.name} />
                            <div className="mini-info">
                                <p><img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${element.elementname}.png`} alt="element" />
                                {element.name}</p>
                                <Link to={`/characters/${element.id}`}><button>profile</button></Link>
                                <button onClick={()=>this.selectMe(element)}>select</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        characters: state.characters,
        loggedIn: state.loggedIn,
        selectedChar: state.selectedChar
    }
}

export default connect(mapStateToProps, {selectedOne})(CharacterList);