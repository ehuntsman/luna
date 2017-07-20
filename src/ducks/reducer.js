import axios from 'axios';
import * as userlogin from './userService';

const initialState = {
    teamName: "My Team Name",
    storyPoint: 0,
    characters: [{name: "Mabel Pines", level: 2}],
    loading: false,
    error: false,
    selectedChar: {},
    loggedIn: {}
}

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_ONE_CHARACTER = "GET_ONE_CHARACTER";
const UPDATE_NAME = 'UPDATE_NAME';
const SELECTED_CHAR = "SELECTED_CHAR";
const SWITCH_CHARACTERS = "SWITCH_CHARACTERS";

const GET_USER = 'GET_USER';

export default function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_NAME:
            return Object.assign({}, state, {teamName: action.payload})
        case GET_CHARACTERS + "_PENDING":
            return Object.assign({}, state, {loading: true, error: false})
        case GET_CHARACTERS + "_REJECTED":
            return Object.assign({}, state, {loading: false, error: true})
        case GET_CHARACTERS + "_FULFILLED":
            return Object.assign({}, state, {characters: action.payload})
        case GET_ONE_CHARACTER + "_PENDING":
            return Object.assign({}, state, {loading: true, error: false})
        case GET_ONE_CHARACTER + "_REJECTED":
            return Object.assign({}, state, {loading: false, error: true})
        case GET_ONE_CHARACTER + "_FULFILLED":
            return Object.assign({}, state, {selectedChar: action.payload})
        case SELECTED_CHAR:
            return Object.assign({}, state, {selectedChar: action.payload})
        case GET_USER + "_PENDING":
            return Object.assign({}, state, {loading: true})
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, {loading: false, loggedIn: action.payload})
        case SWITCH_CHARACTERS:
            return Object.assign({}, state, {loggedIn: action.payload})
        default: return state;
    }
}

export function updateTeamName(name){
    return{
        type: UPDATE_NAME,
        payload: name
    }
}

export function getCharacters(){
    const url = "/api/characters"
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_CHARACTERS,
        payload: promise
    }
}

export function getOneCharacter(id){
    const url = `/api/characters/${id}`
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_ONE_CHARACTER,
        payload: promise
    }
}

export function selectedOne(char){
    return {
        type: SELECTED_CHAR,
        payload: char
    }
}

export function getUserInfo() {
  return {
    type: GET_USER,
    payload: userlogin.getUserInfo()
  }
}

export function updateCurrentTeam(joinus, indexnum, user){
    let newteam = user.currentteam;
    newteam.splice(indexnum, 1, joinus)
    console.log(newteam, "this is the going away one");
    return {
        type: SWITCH_CHARACTERS,
        payload: newteam
    }
}