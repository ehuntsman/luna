import axios from 'axios';

const initialState = {
    teamName: "My Team Name",
    storyPoint: 0,
    characters: [{ name: "Mabel Pines", level: 2 }],
    loading: false,
    error: false,
    selectedChar: {},
    loggedIn: {},
    specialAttacks: []
}

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_ONE_CHARACTER = "GET_ONE_CHARACTER";
const UPDATE_NAME = 'UPDATE_NAME';
const SELECTED_CHAR = "SELECTED_CHAR";
const SWITCH_CHARACTERS = "SWITCH_CHARACTERS";
const GET_USER = 'GET_USER';
const GET_SPECIALS = "GET_SPECIALS";
const UPDATE_STORY = "UPDATE_STORY";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS + "_PENDING":
            return Object.assign({}, state, { loading: true, error: false })
        case GET_CHARACTERS + "_REJECTED":
            return Object.assign({}, state, { loading: false, error: true })
        case GET_CHARACTERS + "_FULFILLED":
            return Object.assign({}, state, { characters: action.payload })
        case GET_ONE_CHARACTER + "_PENDING":
            return Object.assign({}, state, { loading: true, error: false })
        case GET_ONE_CHARACTER + "_REJECTED":
            return Object.assign({}, state, { loading: false, error: true })
        case GET_ONE_CHARACTER + "_FULFILLED":
            return Object.assign({}, state, { selectedChar: action.payload })
        case SELECTED_CHAR:
            return Object.assign({}, state, { selectedChar: action.payload })
        case GET_USER + "_PENDING":
            return Object.assign({}, state, { loading: true })
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, { loading: false, loggedIn: action.payload })
        case SWITCH_CHARACTERS:
            return Object.assign({}, state, { loggedIn: action.payload, selectedChar: {} })
        case UPDATE_NAME:
            return Object.assign({}, state, { loggedIn: action.payload })
        case UPDATE_STORY:
            console.log("the update for the state", action.payload);
            return Object.assign({}, state, { loggedIn: action.payload })
        case GET_SPECIALS + "_PENDING":
            return Object.assign({}, state, { loading: true })
        case GET_SPECIALS + "_FULFILLED":
            return Object.assign({}, state, { specialAttacks: action.payload })
        default: return state;
    }
}

export function updateTeamName(user, name) {
    const url = `/api/user/teamname/${user.id}`
    axios.put(url, { name }).then(response => {
        return response.data
    })
    const result = Object.assign({}, user, { teamname: name })
    return {
        type: UPDATE_NAME,
        payload: result
    }
}

export function getCharacters() {
    const url = "/api/characters"
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_CHARACTERS,
        payload: promise
    }
}

export function getOneCharacter(id) {
    const url = `/api/characters/${id}`
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_ONE_CHARACTER,
        payload: promise
    }
}

export function selectedOne(char) {
    return {
        type: SELECTED_CHAR,
        payload: char
    }
}

export function getUserInfo() {
    const url = `/api/loggeduser`
    const promise = axios.get(url).then(res => {
        return res.data
    });
    return {
        type: GET_USER,
        payload: promise
    }
}

export function updateCurrentTeam(joinus, indexnum, user) {
    let newteam = user.currentteam.slice(0)
    let userObj = Object.assign({}, user)
    newteam.splice(indexnum, 1, joinus + "")
    userObj.currentteam = newteam
    const url = `/api/user/${user.id}`
    axios.put(url, userObj.currentteam).then(response => response.data);
    return {
        type: SWITCH_CHARACTERS,
        payload: userObj
    }
}

export function getSpecialAttacks(){
    const url = "/api/specialattacks";
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_SPECIALS,
        payload: promise
    }
}

export function updateStorypoint(user){
    let userObj = Object.assign({}, user)
    let levelup = userObj.storypoint++
    const url = `/api/user/storypoint/${userObj.id}`
    console.log(userObj, "the new user object for updating level")
    axios.put(url, userObj).then(response => response.data);
    return {
        type: UPDATE_STORY,
        payload: userObj
    }
}