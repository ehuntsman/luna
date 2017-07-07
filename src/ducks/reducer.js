import axios from 'axios';

const initialState = {
    teamName: "My Team Name",
    team: [{name: "Mabel Pines", level: 2}],
    storyPoint: 0,
    characters: [{name: "Mabel Pines", level: 2}],
    loading: false,
    error: false
}

const GET_CHARACTERS = "GET_CHARACTERS";
const UPDATE_NAME = 'UPDATE_NAME';

export default function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_NAME:
            return{
                teamName: action.payload,
                team: state.team
            }
        case GET_CHARACTERS + "_PENDING":
            return{
                error: false,
                loading: true,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint
            }
        case GET_CHARACTERS + "_FULFILLED":
            return{
                error: false,
                loading: false,
                characters: action.payload,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint
            }
        case GET_CHARACTERS + "_REJECTED":
            return{
                error: true,
                loading: false,
                characters: state.characters,
                teamName: state.teamName,
                team: state.team,
                storyPoint: state.storyPoint
            }
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
    const url = "http://localhost:3001/api/characters"
    const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_CHARACTERS,
        payload: promise
    }
}