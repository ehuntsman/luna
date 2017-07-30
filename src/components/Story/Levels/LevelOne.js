import React, { Component } from 'react';
import CurrentTeam from '../../Characters/Team/CurrentTeam';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {getSpecialAttacks, getCharacters, getUserInfo, updateStorypoint} from '../../../ducks/reducer';

class LevelOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            myHealth: 100,
            badHealth: 100,
            badTeam: [
                {cooldown: 0, health: 200, level: 1, boost: 0},
                {cooldown: 0, health: 200, level: 1, boost: 0},
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
            myteam: {},
            disabled: false,
            cooldown:[0,0,0,0,0]
        }
        this.handleSelection = this.handleSelection.bind(this);
        this.attackBad = this.attackBad.bind(this);
        this.attackGood = this.attackGood.bind(this);
        this.resetText = this.resetText.bind(this);
        this.specialAttackGood = this.specialAttackGood.bind(this);
        this.updateLevel = this.updateLevel.bind(this);
    }

    componentDidMount(){
        this.props.getCharacters();
        this.props.getUserInfo();
        const myTotalHealth = 500;
        let badarr = this.state.badTeam;
        const badTotalHealth = badarr.reduce( (prev, next) => prev + next.health,0);
        this.props.getSpecialAttacks();
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
                myteam: tempchararray,
                specialAttacks: this.props.specialAttacks
            })
        }else{
            this.setState({
                myHealth: myTotalHealth,
                badHealth: badTotalHealth,
                specialAttacks: this.props.specialAttacks
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
    updateLevel(user){
        if(user.storypoint == 1){
            this.props.updateStorypoint(user);
        }
    }
    resetText(){
        $("#attack-text").text("Select a character to start an attack").delay(2000);
    }
    specialAttackGood(char, index){
        this.setState({
            selectedChar: {}
        })
        //api call for special attack info
        // btw, uh, special attacks attack everyone now, lol
        let charSpecAttack = undefined;
        let attackname = "no";
        for(var j = 0; j < this.props.specialAttacks.length; j++){
            if(this.props.specialAttacks[j].attackid == char.specialattackid){
                console.log(this.props.specialAttacks[j], "weeeeeeeeeeeeeeeeeeeeeeee");
                charSpecAttack = this.props.specialAttacks[j]
                attackname = this.props.specialAttacks[j].name
            }
        }
        console.log("this is the special attack", charSpecAttack, attackname)
        //attack text
        let attackText = char.name + " used " + charSpecAttack.name;
        $("#attack-text").text(attackText).delay(2000);
        //animation - needs to be cooler!!!!! Maybe swipe the card across the sceen????
        
        $('.special-attack-container').stop().animate(
            {
                'left': '0vw'
            },
            100,
            'swing'
        );

        $('#' + char.id).stop().animate(
            {'left': '0vw','opacity': '1'},100,
            function(){$(this).animate(
                {'left': '+40vw'}, 200,
                    function(){$(this).animate(
                        {'left': '40vw'},500,
                        function(){$(this).animate(
                                {'left': '+100vw'}, 200,
                                    function(){$(this).animate(
                                        {'left': '100vw'}, 500,
                                            function(){$(this).animate(
                                                {'opacity': '0'}, 1,
                                                    function(){$(this).animate(
                                                        {'left': '-100vw'},1,
                                                            function(){
                                                                $('.special-attack-container').animate(
                                                                    {'left': '-100vw'}, 100, 'swing'
                                                                );
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        );

        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '+=45px'
            },
            50,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '-=15px'
            },
            50,
            'swing'
        );
        //calc attack power
        let newcd = this.state.cooldown.slice(0);
        for(var i = 0; i < newcd.length; i++){
            if(newcd[i] > 0){
                newcd[i]--
            }
        }
        newcd[index] = charSpecAttack.cooldown;
        if(this.state.badHealth - charSpecAttack.baseattack > 0){
            this.setState({
                badHealth: this.state.badHealth - charSpecAttack.baseattack,
                selectedChar: {},
                disabled: true,
                cooldown: newcd
            })
        }else{
            this.updateLevel(this.props.loggedIn);
            this.setState({
                badHealth: this.state.badHealth - charSpecAttack.baseattack,
                gameOver: true,
                selectedChar: {},
                disabled: true
            })
        };
        // then have the villians attack here
        setTimeout(this.attackGood, 2000);
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
        console.log("random goodie roll", randomGoodie)
        console.log("this is my state team", this.state.myteam);
        randomBaddie = this.state.badChar[randomBaddie];
        randomGoodie = this.state.myteam[randomGoodie];
        console.log("random goodie guy". randomGoodie);

        this.setState({
            selectedChar: randomBaddie
        });
        //text
        if(randomGoodie){
            let attackText = randomBaddie.name + " attacked " + randomGoodie.name
            $("#attack-text").text(attackText).delay(4000);
        };
        // $("#attack-text").text(attackText).animate({
        //     'margin-left': '+=100vw'
        // }).delay(4000);
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
        ).delay(2000);
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
                selectedChar: {},
                disabled: false
            });
            setTimeout(this.resetText, 2000);
        }else{
            this.setState({
                myHealth: this.state.myHealth - attackPwr,
                selectedChar: {},
                gameOver: true,
                disabled: true
            })
        }
    }
    attackBad(char){
        //attack texts
        let attackText = this.state.selectedChar.name + " attacked " + char.name
        $("#attack-text").text(attackText).delay(2000);
        
        // let attackPwr = this.state.selectedChar.level * 10;
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
                'margin-left': '+=45px'
            },
            50,
            'swing'
        );
        $('.selected-char .char-sprite').animate(
            {
                'margin-left': '-=15px'
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
        //calc attack power and cooldown
        let newcd = this.state.cooldown.slice(0);
        for(var i = 0; i < newcd.length; i++){
            if(newcd[i] > 0){
                newcd[i]--
            }
        }
        if(this.state.badHealth - attackPwr > 0){
            this.setState({
                badHealth: this.state.badHealth - attackPwr,
                selectedChar: {},
                disabled: true,
                cooldown: newcd
            })
        }else{
            this.updateLevel(this.props.loggedIn);
            this.setState({
                badHealth: this.state.badHealth - attackPwr,
                gameOver: true,
                selectedChar: {},
                disabled: true
            })
        };
        // then have the villians attack here
        setTimeout(this.attackGood, 1000);
        // this.attackGood();
}
    render() {
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
                <div className={this.state.gameOver ? "game-over level-current-team level-one" : "level-current-team level-one"}>
                    <h1>level one</h1>
                    <div className="attack-text-box">
                        <h1 id="attack-text">Select a character to start an attack</h1>
                    </div>
                    <div className="current-team-container">                        
                        <div className="health-bar-myteam">
                            <div className="outer-health-bar">
                                <div className="inner-health-bar" style={{width: `${goodHealthPercent}%`}}>
                                </div>
                            </div>
                            {this.props.loggedIn.teamname} {this.state.myHealth}
                        </div>
                        {chararray.map( (char, index) => {
                            return(
                                <div key={index} className={this.state.selectedChar.name === char.name ? "selected-char member member" + index : "member member" + index}>
                                    <div className="char-data-attack">
                                        <div className="name-level-element">
                                            <div>
                                                <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${char.elementname}.png`} alt={char.elementname}/>
                                                <h4>{char.name}</h4>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => this.handleSelection(char)}
                                            className={this.state.disabled || this.state.gameOver ? "disabled-button" : null}
                                            disabled={this.state.disabled || this.state.gameOver  ? true : false}>
                                            {this.state.selectedChar.name === char.name ? "deselect" : "attack!"}
                                        </button>
                                        <button 
                                            onClick={(e) => this.specialAttackGood(char, index)}
                                            className={this.state.selectedChar.name === char.name || this.state.disabled || this.state.gameOver || this.state.cooldown[index] > 0 ? "disabled-button" : null}
                                            disabled={this.state.selectedChar.name === char.name  || this.state.disabled || this.state.gameOver || this.state.cooldown[index] > 0 ? true : false}>
                                            {this.state.cooldown[index] > 0 ? this.state.cooldown[index] : "special attack"}
                                        </button>
                                    </div>

                                    <div className="char-sprite">
                                        <img src={char.imageurl} placeholder={char.name} onClick={(e) => this.handleSelection(char)} alt={char.name}/>
                                    </div>
                                    <div className="special-attack-container">
                                        <div className="gradient1">
                                        </div>
                                        <img src={char.framed} alt={char.name} id={char.id} />
                                        <div className="gradient2">
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="bad-team">
                        <div>
                            {
                                this.state.gameOver
                                ? 
                                this.state.badHealth <= 0 ? 
                                    <div className="you-win">
                                        <Link to="/storymap"><button>next</button></Link>
                                        <Link to="/myteam"><button>return to my team</button></Link>
                                    </div>
                                    :
                                    <div className="you-lose">
                                        <Link to="/storymap"><button>try again</button></Link>
                                        <Link to="/myteam"><button>return to my team</button></Link>
                                    </div>
                                :
                                <div>
                                    <div className="health-bar-badteam">
                                        <div className="outer-health-bar">
                                            <div className="inner-health-bar" style={{width: `${badHealthPercent}%`}}>
                                            </div>
                                        </div>
                                        villians {this.state.badHealth}
                                    </div>
                                    {this.state.badChar.map( (badChar) => {
                                        return(
                                            <div key={badChar.id} className={this.state.selectedChar.name === badChar.name ? "selected-char member" : "member"}>
                                                <img src={badChar.imageurl} placeholder={badChar.name} onClick={this.state.selectedChar.elementname ? (e) => this.attackBad(badChar) : ""} className="char-sprite" alt={badChar.name}/>
                                                <div className="name-level-element">
                                                    <div>
                                                        <h4>{badChar.name}</h4>
                                                        <img className="element-icon" src={`https://s3-us-west-2.amazonaws.com/devschoolluna/${badChar.elementname}.png`}alt={badChar.elementname}/>
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
                            }
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="level-current-team level-one">
                    Sign in to create a team and fight
                </div>
            );


        }
    }
}


function mapStateToProps(state){
    return{
        teamName: state.teamName,
        characters: state.characters,
        loggedIn: state.loggedIn,
        specialAttacks: state.specialAttacks
    }
}

export default connect(mapStateToProps, {getSpecialAttacks, getCharacters, getUserInfo, updateStorypoint})(LevelOne);