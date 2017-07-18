import axios from 'axios';

const initialState = {
    teamName: "My Team Name",
    team: [
        {
            id: 2,
            name: "Dipper Pines",
            imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/dipper.png",
            specialattackid: 2,
            elementid: 10,
            level: 1,
            health: 100,
            elementname: "ghost"
        },
        {
            id: 6,
            name: "Leota",
            imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/leota.png",
            specialattackid: 2,
            elementid: 7,
            level: 1,
            health: 100,
            elementname: "moon"
        },
        {
            id: 8,
            name: "Marco Dias",
            imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/marco.png",
            specialattackid: 2,
            elementid: 2,
            level: 1,
            health: 100,
            elementname: "fire"
        },
        {
            id: 9,
            name: "Garnet",
            imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/garnet.png",
            specialattackid: 2,
            elementid: 9,
            level: 1,
            health: 100,
            elementname: "psychic"
        },
        {
            id: 10,
            name: "Rose Tyler",
            imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/rosetyler.png",
            specialattackid: 2,
            elementid: 2,
            level: 1,
            health: 100,
            elementname: "time"
        }
        ],
    storyPoint: 0,
    characters: [{name: "Mabel Pines", level: 2}],
    loading: false,
    error: false,
    selectedChar: {},
}

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_ONE_CHARACTER = "GET_ONE_CHARACTER";
const UPDATE_NAME = 'UPDATE_NAME';
const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';

export default function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_NAME:
            return Object.assign({}, state, {teamName: action.payload})
        case GET_CHARACTERS + "_PENDING":
            return{
                error: false,
                loading: true,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint,
                loggedIn: state.loggedIn,
                selectedChar: state.selectedChar
            }
        case GET_CHARACTERS + "_REJECTED":
            return{
                error: true,
                loading: false,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint,
                loggedIn: state.loggedIn,
                selectedChar: state.selectedChar
            }
        case GET_CHARACTERS + "_FULFILLED":
            return Object.assign({}, state, {characters: action.payload})
        case GET_ONE_CHARACTER + "_PENDING":
            return{
                error: false,
                loading: true,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint,
                loggedIn: state.loggedIn,
                selectedChar: state.selectedChar
            }
        case GET_ONE_CHARACTER + "_REJECTED":
            return{
                error: true,
                loading: false,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint,
                loggedIn: state.loggedIn,
                selectedChar: state.selectedChar
            }
        case GET_ONE_CHARACTER + "_FULFILLED":
            return Object.assign({}, state, {selectedChar: action.payload})
        case GET_USER_PENDING:
            return Object.assign({}, state, {loading: true})
        case GET_USER_FULFILLED:
            return Object.assign({}, state, {loading: false, userData: action.payload})
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

// export function loggedInAreWe(){
//     const url = "http://localhost:3000/myteam"
//     const promise = axios.get(url).then(response => response.data);
//     console.log(promise, 'this is my promisejlkfhkfdhkj');
//     return {
//         type: LOGGED_IN_AS,
//         payload: promise
//     }
// }

// export const getUserInfo = function(){
//     return axios.get("http://localhost:3000/myteam")
//     .then(res => {
//         console.log(res.data);
//         return res.data[0]
//     })
// }

// export function reducer(state = initialState, action) {
//   switch(action.type) {
//     case GET_USER_PENDING:
//       return Object.assign({}, state, {loading: true})

//     case GET_USER_FULFILLED:
//       return Object.assign({}, state, {loading: false, userData: action.payload})

//     default:
//       return state
//   }
// }
// export function getUserInfo() {
//   return {
//     type: GET_USER,
//     payload: userlogin.getUserInfo()
//   }
// }
// app.get('/myteam', function(req,res){
//         if(!req.user){
//             return res.status(200).send(null);
//         }
//         console.log(req.user, "this is the req user in myteam");
//         res.status(200).send(req.user);
//     });