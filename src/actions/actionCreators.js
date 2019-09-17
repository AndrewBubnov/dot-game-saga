import {
    SET_STARTED,
    SET_VALUES,
    SET_MODAL_OPEN,
    SET_ERROR_MESSAGE,
    SET_SCORE,
    SET_GAME_FIELD,
    CALL_START_GAME,
    CALL_PRESETS,
    CALL_LEADER_BOARD,
    CALL_USER_CLICK,
    CALL_TICK, SET_SLIDER_VALUES
} from '../actions/actions'


export const setStart = () => ({type: CALL_START_GAME})
//**********************

export const getPresetsFromServer =  () => ({type: CALL_PRESETS})
//**********************

export const getLeaderBoard = () => ({type: CALL_LEADER_BOARD})
//**********************

export const onUserClick = (e) => ({type: CALL_USER_CLICK, payload: {e}})
//**********************

export const setTick = () => ({type: CALL_TICK})
//**********************

export const handleChange = (e, name) => ({type: SET_VALUES, payload: {name, value: e.target.value}})
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
export const handleSliderChange = (name, value) => ({type: SET_SLIDER_VALUES, payload: {name, value}})




