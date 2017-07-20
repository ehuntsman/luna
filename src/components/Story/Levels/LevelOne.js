import React, { Component } from 'react';
import CurrentTeam from '../../Characters/Team/CurrentTeam';
import {connect} from 'react-redux';

class LevelOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            myHealth: 100,
            badHealth: 100,
            myTeam: [
                {cooldown: 0, boost: 0},
                {cooldown: 0, boost: 0},
                {cooldown: 0, boost: 0},
                {cooldown: 0, boost: 0},
                {cooldown: 0, boost: 0},
                {cooldown: 0, boost: 0},
            ],
            badTeam: [
                {cooldown: 0, health: 100, level: 3, boost: 0},
                {cooldown: 0, health: 100, level: 1, boost: 0},
            ],
            selectedChar: {},
            gameOver: false
        }
    }
    componentDidMount(){
        let myarr = this.props.teamMembers;
        const myTotalHealth = myarr.reduce( (prev,next) => prev + next.health,0);
        let badarr = this.state.badTeam;
        const badTotalHealth = badarr.reduce( (prev, next) => prev + next.health,0);
        this.setState({
            myHealth: myTotalHealth,
            badHealth: badTotalHealth
        })
    }
    handleSelection(character){
        if(this.state.selectedChar === character){
            this.setState({
                selectedChar: {}
            })
        }else{
            this.setState({
                selectedChar: character
            })
        }
    }
    attackBad(char){
        let attackPwr = this.state.selectedChar.level * 10;
        if(this.state.badHealth - attackPwr > 0){
            this.setState({
                badHealth: this.state.badHealth - attackPwr,
                selectedChar: {}
            })
        }else{
            this.setState({
                badHealth: this.state.badHealth - attackPwr,
                selectedChar: {},
                gameOver: true
            })
        }
    }
    render() {
        let badChar = [
            {
                id: 4,
                name: "Sylvanas Windrunner",
                imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/sylvanas.png",
                specialattackid: 3,
                elementid: 3,
                level: 1,
                elementname: "ghost"
            },
            {
                id: 7,
                name: "Buffy Summers",
                imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/buffy.png",
                specialattackid: 2,
                elementid: 5,
                level: 1,
                elementname: "lightning"
            }
        ];
        // this needs to render in state somehow. Maybe in level state?


        return (
            <div className="level-current-team">
                <h1>level one</h1>
                <div className="bad-team">
                    <div>
                        {
                            this.state.gameOver
                            ? 
                            this.state.badHealth === 0 ? "YOU WIN!" : "YOU LOSE!"
                            : null
                        }
                        {badChar.map( (badChar) => {
                            return(
                                <div className="member" key={badChar.id}>
                                    <h4>{badChar.name}</h4>
                                    <img src={badChar.imageurl} placeholder={badChar.name} onClick={this.state.selectedChar ? (e) => this.attackBad(badChar) : ""} />
                                    <div className="level-element">
                                        <div className="level">
                                            <p>{badChar.level}</p>
                                        </div>
                                        <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${badChar.elementname}.png`}/>
                                    </div>
                                    {
                                        this.state.selectedChar.name
                                        ? <button onClick={(e) => this.attackBad(badChar)}>attack {badChar.name}</button>
                                        : <div className="button-spacer"></div>
                                    }
                                </div>
                            )
                        })}
                        <div className="health-bar-badteam">
                            villians healthbar {this.state.badHealth}
                        </div>
                    </div>
                </div>

                <div className="ingame-instructions">
                    <p>All health is shared on a team. To attack, click who you would like to do the attacking. Special attacks come with a cooldown, which will display how many turns is left until you can use that character again for anything (including regular attacks).</p>
                </div>

                <div className="health-bar-myteam">
                    {this.props.teamName} healthbar {this.state.myHealth}
                </div>
                <div className="current-team-container">
                    {this.props.teamMembers.map( (char) => {
                        return(
                            <div key={char.id} className={this.state.selectedChar.name === char.name ? "selected-char member" : "member"}>
                                <h4>{char.name}</h4>
                                <img src={char.imageurl} placeholder={char.name} onClick={(e) => this.handleSelection(char)} />
                                <div className="level-element">
                                    <div className="level">
                                        <p>{char.level}</p>
                                    </div>
                                    <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${char.elementname}.png`}/>
                                </div>
                                <button 
                                    onClick={(e) => this.handleSelection(char)}
                                    className={this.state.gameOver ? "disabled-button" : null}
                                    disabled={this.state.gameOver ? true : false}>
                                    {this.state.selectedChar.name === char.name ? "deselect" : "attack!"}
                                </button>
                                <button className={this.state.selectedChar.name === char.name || this.state.gameOver ? "disabled-button" : null} disabled={this.state.selectedChar.name === char.name  || this.state.gameOver ? true : false}>
                                    special attack
                                    {/*if it's a special attack, click to see the description, then click the new button to attack*/}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        teamName: state.teamName,
        teamMembers: state.team,
    }
}

export default connect(mapStateToProps, {})(LevelOne);