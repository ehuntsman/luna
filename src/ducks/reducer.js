import axios from 'axios';

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
            return Object.assign({}, state, {loggedIn: action.payload, selectedChar: {}})
        case UPDATE_NAME:
            return Object.assign({}, state, {loggedIn: action.payload})
        default: return state;
    }
}

export function updateTeamName(user, name){
    const url = `/api/user/teamname/${user.id}`
    const promise = axios.put(url, {name}).then(response => {
        return response.data
    })
    const result = Object.assign({}, user, {teamname: name})
    return{
        type: UPDATE_NAME,
        payload: result
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
    // when you make a new user, then add all the characters with level 1.
    const url = `/api/loggeduser`
    const promise = axios.get(url).then(res => 
        // if(res.data && res.data.id){
        //     const progress = axios.get(`/api/progress/${res.data.id}`).then(response => {
        //         if(response.data.length === 0){
        //             const dataone = {
        //                 userid: res.data.id,
        //                 charid: res.data.currentteam[0]
        //             }
        //             const datatwo = {
        //                 userid: res.data.id,
        //                 charid: res.data.currentteam[1]
        //             }
        //             const datathree = {
        //                 userid: res.data.id,
        //                 charid: res.data.currentteam[2]
        //             }
        //             const datafour = {
        //                 userid: res.data.id,
        //                 charid: res.data.currentteam[3]
        //             }
        //             const datafive = {
        //                 userid: res.data.id,
        //                 charid: res.data.currentteam[4]
        //             }
        //             axios.post('/api/progress', dataone).then(resp => resp.data)
        //             axios.post('/api/progress', datatwo).then(resp => resp.data)
        //             axios.post('/api/progress', datathree).then(resp => resp.data)
        //             axios.post('/api/progress', datafour).then(resp => resp.data)
        //             axios.post('/api/progress', datafive).then(resp => resp.data)
        //         }else{
        //             let shiny = []
        //             for(let u = 0; u < response.data.length; u++){
        //                 for(let c = 0; c < res.data.currentteam.length; c++){
        //                     if(response.data[u].charid == res.data.currentteam[c]){
        //                         shiny.push(response.data[u].charid)
        //                     }
        //                 }
        //             }
        //             let timeless = res.data.currentteam;
        //             for(var i=0; i<timeless.length; i++) { timeless[i] = parseInt(timeless[i], 10); } 
        //             let cake = timeless.filter(function(e){return this.indexOf(e)<0;},shiny);
        //             for(let f = 0; f < cake.length; f++){
        //                 let chardata = {
        //                     userid: res.data.id,
        //                     charid: cake[f]
        //                 }
        //                 axios.post('/api/progress', chardata).then(resp => resp.data)
        //             }
        //         }
        //         return response.data
        //     })
        // }
        res.data
    );

    return {
        type: GET_USER,
        payload: promise
    }
}

export function updateCurrentTeam(joinus, indexnum, user){
    let newteam = user.currentteam.slice(0)
    let userObj = Object.assign({}, user)
    newteam.splice(indexnum, 1, joinus+"")
    userObj.currentteam = newteam
    const url = `/api/user/${user.id}`
    const promise = axios.put(url, userObj.currentteam).then(response => response.data);
    return {
        type: SWITCH_CHARACTERS,
        payload: userObj
    }
}