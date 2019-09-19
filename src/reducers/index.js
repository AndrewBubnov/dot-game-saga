import {
    SET_STARTED,
    SET_PRESETS,
    SET_NEXT_GAME,
    SET_LEADER_BOARD,
    SET_VALUES,
    SET_MODAL_OPEN,
    SET_ERROR_MESSAGE,
    SET_SCORE,
    SET_GAME_FIELD,
    SET_WINNER,
    SET_RANDOM_INDEX,
    SET_SLIDER_VALUES
} from '../actions/actions'

const initialState = {
    started: false,
    presets: {},
    nextGame: false,
    leaderBoard: [],
    values: {
        preset: {
            field: 5,
            delay: 2000,
        },
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
    randomIndex: null,
}

function rootReducer (state = initialState, {type, payload}) {
    switch (type){
        case SET_STARTED:
            return {...state, started: payload}
        case SET_PRESETS:
            return {...state, presets: payload}
        case SET_NEXT_GAME:
            return {...state, nextGame: payload}
        case SET_LEADER_BOARD:
            return {...state, leaderBoard: payload}
        case SET_MODAL_OPEN:
            return {...state, modalOpen: payload}
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: payload}
        case SET_SCORE:
            return {...state, score: payload}
        case SET_GAME_FIELD:
            return {...state, gameField: payload}
        case SET_WINNER:
            return {...state, winner: payload}
        case SET_RANDOM_INDEX:
            return {...state, randomIndex: payload}
        case SET_VALUES:
            return {...state, values: {...state.values, [payload.name]: payload.value}}
        case SET_SLIDER_VALUES:
            return {...state, values: {...state.values, preset: {...state.values.preset, [payload.name]: payload.value}}}

        default:
            return {...state}
    }
}

// const handlers = {
//         [SET_STARTED]:       (state, { payload }) => ({...state, started: payload}),
//         [SET_PRESETS]:       (state, { payload }) => ({...state, presets: payload}),
//         [SET_NEXT_GAME]:     (state, { payload }) => ({...state, nextGame: payload}),
//         [SET_LEADER_BOARD]:  (state, { payload }) => ({...state, leaderBoard: payload}),
//         [SET_MODAL_OPEN]:    (state, { payload }) => ({...state, modalOpen: payload}),
//         [SET_ERROR_MESSAGE]: (state, { payload }) => ({...state, errorMessage: payload}),
//         [SET_SCORE]:         (state, { payload }) => ({...state, score: payload}),
//         [SET_GAME_FIELD]:    (state, { payload }) => ({...state, gameField: payload}),
//         [SET_WINNER]:        (state, { payload }) => ({...state, winner: payload}),
//         [SET_RANDOM_INDEX]:  (state, { payload }) => ({...state, randomIndex: payload}),
//         [SET_VALUES]:        (state, { payload }) =>
//             ({...state, values: {...state.values, [payload.name]: payload.value}}),
//         [SET_SLIDER_VALUES]: (state, { payload }) =>
//             ({...state, values: {...state.values, preset: {...state.values.preset, [payload.name]: payload.value}}}),
//
//         DEFAULT: state => ({...state})
// }
//
// const rootReducer = (state = initialState, action) => {
//     const handle = handlers[action.type] || handlers.DEFAULT
//     return handle(state, action)
// }


export default rootReducer