import React, { Component } from 'react';
import CurrentTeam from '../../Characters/Team/CurrentTeam';
import {connect} from 'react-redux';
import $ from 'jquery';

class LevelOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            myHealth: 100,
            badHealth: 100,
            badTeam: [
                {cooldown: 0, health: 100, level: 1, boost: 0},
                {cooldown: 0, health: 100, level: 1, boost: 0},
            ],
            selectedChar: {},
            gameOver: false,
            badChar: [
                {
                    id: 501,
                    name: "Bill Cipher",
                    imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/billcipher.png",
                    specialattackid: 3,
                    elementid: 3,
                    level: 1,
                    elementname: "ghost"
                },
                {
                    id: 502,
                    name: "Gideon",
                    imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/gideon.png",
                    specialattackid: 2,
                    elementid: 5,
                    level: 1,
                    elementname: "lightning"
                }
            ],
            myteam: {}
        }
        this.handleSelection = this.handleSelection.bind(this);
        this.attackBad = this.attackBad.bind(this);
        this.attackGood = this.attackGood.bind(this);
    }
    componentDidMount(){
        // let myarr = this.props.loggedIn.currentteam;
        const myTotalHealth = 500;
        // const myTotalHealth = myarr.reduce( (prev,next) => prev + next.health,0);
        let badarr = this.state.badTeam;
        const badTotalHealth = badarr.reduce( (prev, next) => prev + next.health,0);
        if(this.props.loggedIn && this.props.loggedIn.username){
            let tempone = this.props.loggedIn.currentteam;
            let tempchararray = [];
            for(var j = 0; j < this.props.loggedIn.currentteam.length; j++){
                for(var i = 0; i < this.props.characters.length; i++){
                    if(this.props.characters[i].id == tempone[j]){
                        tempchararray.push(this.props.characters[i]);
                    }
                }
            }
            this.setState({
                myHealth: myTotalHealth,
                badHealth: badTotalHealth,
                myteam: tempchararray
            })
        }else{
            this.setState({
                myHealth: myTotalHealth,
                badHealth: badTotalHealth
            })
        }
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
    attackGood() {
        //good animation
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        };
        let randomBaddie = getRandomInt(0, this.state.badTeam.length);
        let randomGoodie = getRandomInt(0, 5);
        randomBaddie = this.state.badChar[randomBaddie];
        randomGoodie = this.state.myteam[randomGoodie];

        console.log(this.props.loggedIn.currentteam, "current team and ", randomGoodie)
        this.setState({
            selectedChar: randomBaddie
        });
        //text
        let attackText = randomBaddie.name + " attacks " + randomGoodie.name
        $("#attack-text").text(attackText).delay(1000);
        //animation
        $('.selected-char .char-sprite').animate(
            {
                'margin-right': '-=30px'
            },
            100,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-right': '+=60px'
            },
            50,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-right': '-=30px'
            },
            50,
            'swing'
        );
        let attackPwr = 10;
        let myelem = randomBaddie.elementname;
        let badelem = randomGoodie.elementname;
            //element calc
            if(myelem == "water" && badelem == "fire" || myelem == "water" && badelem == "psychic" || myelem == "fire" && badelem == "shadow" || myelem == "fire" && badelem == "ghost" || myelem == "shadow" && badelem == "moon" || myelem == "shadow" && badelem == "ghost" || myelem == "light" && badelem == "shadow" || myelem == "light" && badelem == "time" || myelem == "lightning" && badelem == "water" || myelem == "lightning" && badelem == "psychic" || myelem == "time" && badelem == "fire" || myelem == "time" && badelem == "sun" || myelem == "moon" && badelem == "light" || myelem == "moon" && badelem == "lightning" || myelem == "sun" && badelem == "water" || myelem == "sun" && badelem == "moon" || myelem == "psychic" && badelem == "light" || myelem == "psychic" && badelem == "sun" || myelem == "ghost" && badelem == "lightning" || myelem == "ghost" && badelem == "time"){
                attackPwr = 20;
            }else if(myelem == "water" && badelem == "lightning" || myelem == "water" && badelem == "moon" || myelem == "fire" && badelem == "water" || myelem == "fire" && badelem == "psychic" || myelem == "shadow" && badelem == "light" || myelem == "shadow" && badelem == "sun" || myelem == "light" && badelem == "lightning" || myelem == "light" && badelem == "sun" || myelem == "lightning" && badelem == "fire" || myelem == "lightning" && badelem == "light" || myelem == "time" && badelem == "shadow" || myelem == "time" && badelem == "ghost" || myelem == "moon" && badelem == "time" || myelem == "moon" && badelem == "ghost" || myelem == "sun" && badelem == "fire" || myelem == "sun" && badelem == "time" || myelem == "psychic" && badelem == "water" || myelem == "psychic" && badelem == "moon" || myelem == "ghost" && badelem == "shadow" || myelem == "ghost" && badelem == "psychic"){
                attackPwr = 5;
            }
        if(this.state.myHealth - attackPwr > 0){
            this.setState({
                myHealth: this.state.myHealth - attackPwr,
                selectedChar: {}
            })
        }else{
            this.setState({
                myHealth: this.state.myHealth - attackPwr,
                selectedChar: {},
                gameOver: true
            })
        }
    }
    attackBad(char){
        console.log("this is the selkected char", this.state.selectedChar)
        // let attackPwr = this.state.selectedChar.level * 10;
        var attackingChar = document.getElementsByClassName("selected-char");
        // .selectedChar .sprite animates
        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '-=30px'
            },
            100,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '+=60px'
            },
            50,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '-=30px'
            },
            50,
            'swing'
        );
        let myelem = this.state.selectedChar.elementname;
        let badelem = char.elementname;
        let attackPwr = 10;
            //element calc
            if(myelem == "water" && badelem == "fire" || myelem == "water" && badelem == "psychic" || myelem == "fire" && badelem == "shadow" || myelem == "fire" && badelem == "ghost" || myelem == "shadow" && badelem == "moon" || myelem == "shadow" && badelem == "ghost" || myelem == "light" && badelem == "shadow" || myelem == "light" && badelem == "time" || myelem == "lightning" && badelem == "water" || myelem == "lightning" && badelem == "psychic" || myelem == "time" && badelem == "fire" || myelem == "time" && badelem == "sun" || myelem == "moon" && badelem == "light" || myelem == "moon" && badelem == "lightning" || myelem == "sun" && badelem == "water" || myelem == "sun" && badelem == "moon" || myelem == "psychic" && badelem == "light" || myelem == "psychic" && badelem == "sun" || myelem == "ghost" && badelem == "lightning" || myelem == "ghost" && badelem == "time"){
                attackPwr = 20;
            }else if(myelem == "water" && badelem == "lightning" || myelem == "water" && badelem == "moon" || myelem == "fire" && badelem == "water" || myelem == "fire" && badelem == "psychic" || myelem == "shadow" && badelem == "light" || myelem == "shadow" && badelem == "sun" || myelem == "light" && badelem == "lightning" || myelem == "light" && badelem == "sun" || myelem == "lightning" && badelem == "fire" || myelem == "lightning" && badelem == "light" || myelem == "time" && badelem == "shadow" || myelem == "time" && badelem == "ghost" || myelem == "moon" && badelem == "time" || myelem == "moon" && badelem == "ghost" || myelem == "sun" && badelem == "fire" || myelem == "sun" && badelem == "time" || myelem == "psychic" && badelem == "water" || myelem == "psychic" && badelem == "moon" || myelem == "ghost" && badelem == "shadow" || myelem == "ghost" && badelem == "psychic"){
                attackPwr = 5;
            }
        //are they compatible?
        //calc attack power
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
        };
        // then have the villians attack here
        setTimeout(this.attackGood, 1000);
        // this.attackGood();
}
    render() {
        console.log("this is the selected character at any given time", this.state.selectedChar);

        if(this.props.loggedIn && this.props.loggedIn.username){
            let temparray = this.props.loggedIn.currentteam;
            let chararray = [];
            for(var j = 0; j < this.props.loggedIn.currentteam.length; j++){
                for(var i = 0; i < this.props.characters.length; i++){
                    if(this.props.characters[i].id == temparray[j]){
                        chararray.push(this.props.characters[i]);
                    }
                }
            }

            //calc health bar
            const myTotalHealth = 500; //this is temporary, pull from db
            let badarr = this.state.badTeam;
            const badTotalHealth = badarr.reduce( (prev, next) => prev + next.health,0);
            let badHealthPercent = this.state.badHealth/badTotalHealth*100
            let goodHealthPercent = this.state.myHealth/myTotalHealth*100
            return (
                <div className="level-current-team level-one">
                    <h1>level one</h1>
                    <h1 id="attack-text"></h1>
                    <div className="current-team-container">                        
                        <div className="health-bar-myteam">
                            <div className="outer-health-bar">
                                <div className="inner-health-bar" style={{width: `${goodHealthPercent}%`}}>
                                </div>
                            </div>
                            {this.props.teamName} healthbar {this.state.myHealth}
                        </div>
                        {chararray.map( (char, index) => {
                            return(
                                <div key={index} className={this.state.selectedChar.name === char.name ? "selected-char member member" + index : "member member" + index}>
                                    <div className="char-data-attack">
                                        <div className="name-level-element">
                                            <div>
                                                <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${char.elementname}.png`}/>
                                                <h4>{char.name}</h4>
                                            </div>
                                            <p>{char.level}</p>
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
                                    <img src={char.imageurl} placeholder={char.name} onClick={(e) => this.handleSelection(char)} className="char-sprite" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="bad-team">
                        <div>
                            {
                                this.state.gameOver
                                ? 
                                this.state.badHealth === 0 ? "YOU WIN!" : "YOU LOSE!"
                                : null
                            }
                            <div className="health-bar-badteam">
                                <div className="outer-health-bar">
                                    <div className="inner-health-bar" style={{width: `${badHealthPercent}%`}}>
                                    </div>
                                </div>
                                villians healthbar {this.state.badHealth}
                            </div>
                            {this.state.badChar.map( (badChar) => {
                                return(
                                    <div key={badChar.id} className={this.state.selectedChar.name === badChar.name ? "selected-char member" : "member"}>
                                        <img src={badChar.imageurl} placeholder={badChar.name} onClick={this.state.selectedChar.elementname ? (e) => this.attackBad(badChar) : ""} className="char-sprite" />
                                        <div className="name-level-element">
                                            <div>
                                                <h4>{badChar.name}</h4>
                                                <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${badChar.elementname}.png`}/>
                                            </div>
                                            {
                                                this.state.selectedChar.name
                                                ? <button className="attackme" onClick={(e) => this.attackBad(badChar)}>attack {badChar.name}</button>
                                                : <div className="button-spacer"></div>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div>log in yo</div>
            )
        }
    }
}


function mapStateToProps(state){
    return{
        teamName: state.teamName,
        characters: state.characters,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, {})(LevelOne);