import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCharacters} from '../../../ducks/reducer.js';

class CharacterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            characters: [{name: "Mabel Pines", level: 2}]
        }
    }
    componentDidMount(){
        this.props.getCharacters();
    }
    render() {
        return (
            <div>
                {console.log(this.props.characters, "cake")}
                <h1>character list component</h1>
                <p>if you click one of me, then one above, I will replce the once above</p>
                <p>if a character is on your current team, then it will be greyed out/disabled on this list</p>
                <p>each character will have a profile button and a select me button(which is also the image)</p>

                {this.props.characters.map( (element) => {
                    return(
                        <div className="char-box" key={element.id}>
                            <p>{element.name}</p>
                        </div>
                    )
                })}

            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        characters: state.characters
    }
}
export default connect(mapStateToProps, {getCharacters})(CharacterList);