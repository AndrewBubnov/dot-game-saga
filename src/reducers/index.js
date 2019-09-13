import {
    SET_FIELD,
    SET_DELAY,
    SET_STARTED,
    SET_PRESETS,
    SET_NEXT_GAME,
    SET_LEADER_BOARD,
    SET_VALUES,
    SET_MODAL_OPEN,
    SET_ERROR_MESSAGE,
    SET_SCORE,
    SET_GAME_FIELD,
    SET_WINNER
} from '../actions/actions'

const initialState = {
    field: 5,
    delay: 2000,
    started: false,
    presets: {},
    nextGame: false,
    leaderBoard: [],
    values: {
        preset: {},
        name: ''
    },
    score: {
        computer: 0,
        user: 0
    },
    modalOpen: false,
    errorMessage: '',
    gameField: [],
    winner: '',
}

function rootReducer (state = initialState, action) {
    switch (action.type){
        case SET_DELAY:
            return {...state, delay: action.payload}
        case SET_FIELD:
            return {...state, field: action.payload}
        case SET_STARTED:
            return {...state, started: action.payload}
        case SET_PRESETS:
            return {...state, presets: action.payload}
        case SET_NEXT_GAME:
            return {...state, nextGame: action.payload}
        case SET_LEADER_BOARD:
            return {...state, leaderBoard: action.payload}
        case SET_MODAL_OPEN:
            return {...state, modalOpen: action.payload}
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.payload}
        case SET_SCORE:
            return {...state, score: action.payload}
        case SET_GAME_FIELD:
            return {...state, gameField: action.payload}
        case SET_WINNER:
            return {...state, winner: action.payload}
        case SET_VALUES:
            return {...state, values: {...state.values, [action.payload.name]: action.payload.value}}

        default:
            return {...state}
    }
}

export default rootReducer