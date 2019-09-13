import {
    SET_FIELD,
    SET_DELAY,
    SET_STARTED,
    SET_VALUES,
    SET_MODAL_OPEN,
    SET_ERROR_MESSAGE,
    SET_SCORE,
    SET_GAME_FIELD,
    CALL_END_GAME,
    CALL_START_GAME,
    SET_NEXT_GAME,
    CALL_PRESETS,
    CALL_LEADER_BOARD
} from '../actions/actions'



export const setStart = () => ({type: CALL_START_GAME})           //redux-saga call
//**********************

export const getPresetsFromServer =  () => ({type: CALL_PRESETS}) //redux-saga call
//**********************

export const setEndGame = () => ({type: CALL_END_GAME})           //redux-saga call
//**********************

export const getLeaderBoard = () => ({type: CALL_LEADER_BOARD})   //redux-saga call
//**********************

export const setPresets = (preset) => {
    return dispatch => {
        dispatch({type: SET_FIELD, payload: preset.field})
        dispatch({type: SET_DELAY, payload: preset.delay})
    }
}
//**********************

export const handleChange = (e, name) => {
    return dispatch => {
        if (name === 'preset') dispatch(setPresets(e.target.value))
        dispatch({type: SET_VALUES, payload: {name, value: e.target.value}})
    }
}

//**********************

export const setModalClosed = () => {
    return  dispatch => {
        dispatch({type: SET_MODAL_OPEN, payload: false})
        dispatch({type: SET_ERROR_MESSAGE, payload: ''})
    }
}
//**********************

export const setModalOpen = (text) => {
    return dispatch => {
        dispatch({type: SET_MODAL_OPEN, payload: true})
        dispatch({type: SET_ERROR_MESSAGE, payload: text})
    }
}
//**********************

export const setScore = (score, value) => {
    let newScore = {}
    if (value === 'user') newScore = {...score, user: score.user + 1}
    if (value === 'computer') newScore = {...score, computer: score.computer + 1}
    return ({type: SET_SCORE, payload: newScore})
}
//**********************

export const setGameField = (array) => dispatch => {
    dispatch({type: SET_GAME_FIELD, payload: array})
}
//**********************

export const setInitialField = (size) => {
    const value = (Array.from({length: size}, v => ''))
    return ({type: SET_GAME_FIELD, payload: value})
}
//**********************

export const resetGame = () => {
    return dispatch => {
        dispatch({type: SET_STARTED, payload: false})
        dispatch({type: SET_SCORE, payload: {computer: 0, user: 0}})
    }
}
//**********************

export const setNextGame = (value) => ({type: SET_NEXT_GAME, payload: value})