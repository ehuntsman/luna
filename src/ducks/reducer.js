import axios from 'axios';

const initialState = {
    teamName: "My Team Name",
    storyPoint: 0,
    currentteam:[2,6,8,9,10],
    characters: [
    { 
        id: 0,
        name: "Dipper Pines",
        level: 2,
        elementname:"lightning",
        element: "lightning",
        specialattack: "chop chop",
        elementid: 5,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/dipper.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/dipperframed.png",
    },
    { 
        id: 1,
        name: "Mabel Pines",
        level: 2,
        elementname:"ghost",
        element: "ghost",
        specialattack: "chop chop",
        elementid: 3,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/mabel.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/mabelframed.png",
    },
    {
        id: 2,
        name: "Yoshi",
        level: 2,
        elementname:"water",
        element: "water",
        specialattack: "chop chop",
        elementid: 1,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/yoshi.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/yoshiframed.png"
    },
    {
        id: 3,
        name: "Star Butterfly",
        level: 2,
        elementname:"time",
        element: "time",
        specialattack: "chop chop",
        elementid: 6,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/starbutterfly.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/starbutterflyframed.png"
    },
    {
        id: 4,
        name: "Leota",
        level: 2,
        elementname:"psychic",
        element: "psychic",
        specialattack: "chop chop",
        elementid: 10,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/leota.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/leotaframed.png"
    },
    {
        id: 5,
        name: "Garnet",
        level: 2,
        elementname:"light",
        element: "light",
        specialattack: "chop chop",
        elementid: 9,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/garnet.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/garnetframed.png"
    },
    {
        id: 6,
        name: "Sylvanas",
        level: 2,
        elementname:"shadow",
        element: "shadow",
        specialattack: "chop chop",
        elementid: 8,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/sylvanas.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/sylvanasframed.png"
    },
    {
        id: 7,
        name: "Wirt",
        level: 2,
        elementname:"fire",
        element: "fire",
        specialattack: "chop chop",
        elementid: 2,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/wirt.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/wirtframed.png"
    },
    {
        id: 8,
        name: "Red",
        level: 2,
        elementname:"fire",
        element: "fire",
        specialattack: "chop chop",
        elementid: 2,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/red.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/redframed.png"
    },
    {
        id: 9,
        name: "Ladybug",
        level: 2,
        elementname:"fire",
        element: "fire",
        specialattack: "chop chop",
        elementid: 2,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/ladybug.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/ladybugframed.png"
    },
    {
        id: 10,
        name: "Marco",
        level: 2,
        elementname:"fire",
        element: "fire",
        specialattack: "chop chop",
        elementid: 2,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/marco.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/marcoframed.png"
    },
    {
        id: 11,
        name: "Rose Tyler",
        level: 2,
        elementname:"time",
        element: "time",
        specialattack: "chop chop",
        elementid: 6,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/rosetyler.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/rosetylerframed.png"
    },
    {
        id: 12,
        name: "Eleven",
        level: 2,
        elementname:"moon",
        element: "moon",
        specialattack: "chop chop",
        elementid: 7,
        imageurl: "https://s3-us-west-2.amazonaws.com/devschoolluna/eleven.png",
        framed: "https://s3-us-west-2.amazonaws.com/devschoolluna/elevenframed.png"
    }],
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
// const GET_SPECIALS = "GET_SPECIALS";
const UPDATE_STORY = "UPDATE_STORY";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case GET_CHARACTERS + "_PENDING":
        //     return Object.assign({}, state, { loading: true, error: false })
        // case GET_CHARACTERS + "_REJECTED":
        //     return Object.assign({}, state, { loading: false, error: true })
        case GET_CHARACTERS:
            return Object.assign({}, state, { characters: action.payload })
        // case GET_ONE_CHARACTER + "_PENDING":
        //     return Object.assign({}, state, { loading: true, error: false })
        // case GET_ONE_CHARACTER + "_REJECTED":
        //     return Object.assign({}, state, { loading: false, error: true })
        case GET_ONE_CHARACTER:
            return Object.assign({}, state, { selectedChar: action.payload })
        case SELECTED_CHAR:
            return Object.assign({}, state, { selectedChar: action.payload })
        case GET_USER + "_PENDING":
            return Object.assign({}, state, { loading: true })
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, { loading: false, loggedIn: action.payload })
        case SWITCH_CHARACTERS:
            return Object.assign({}, state, { currentteam: action.payload, selectedChar: {} })
        case UPDATE_NAME:
            return Object.assign({}, state, { loggedIn: action.payload })
        case UPDATE_STORY:
            console.log("the update for the state", action.payload);
            return Object.assign({}, state, { loggedIn: action.payload })
        // case GET_SPECIALS + "_PENDING":
        //     return Object.assign({}, state, { loading: true })
        // case GET_SPECIALS + "_FULFILLED":
        //     return Object.assign({}, state, { specialAttacks: action.payload })
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
    // const url = "/api/characters"
    // const promise = axios.get(url).then(response => response.data);
    return {
        type: GET_CHARACTERS,
        payload: initialState.characters
    }
}

export function getOneCharacter(id) {
    // const url = `/api/characters/${id}`
    // const promise = axios.get(url).then(response => response.data);
    const cake = id - 1
    return {
        type: GET_ONE_CHARACTER,
        // payload: promise
        payload: initialState.characters[cake]
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

export function updateCurrentTeam(joinus, indexnum) {
    console.log("this is the initial state", initialState)
    let newteam = initialState.currentteam.slice(0)
    // let userObj = Object.assign({}, user)
    newteam.splice(indexnum, 1, joinus)
    console.log("this is the new currentteam**************", "***", newteam )
    // userObj.currentteam = newteam
    // const url = `/api/user/${user.id}`
    // axios.put(url, userObj.currentteam).then(response => response.data);
    return {
        type: SWITCH_CHARACTERS,
        payload: newteam
    }
}

// export function getSpecialAttacks(){
//     // const url = "/api/specialattacks";
//     // const promise = axios.get(url).then(response => response.data);
//     return {
//         type: GET_SPECIALS,
//         payload: initialState.specialAttacks
//     }
// }

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