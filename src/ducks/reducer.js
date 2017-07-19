import axios from 'axios';

const initialState = {
    teamName: "My Team Name",
    currentTeamOne: 2,
    currentTeamTwo: 6,
    currentTeamThree: 8,
    currentTeamFour: 9,
    currentTeamFive: 10,
    storyPoint: 0,
    characters: [{name: "Mabel Pines", level: 2}],
    loading: false,
    error: false,
    selectedChar: {}
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