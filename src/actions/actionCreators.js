import {
    SET_VALUES,
    SET_SLIDER_VALUES,
    SET_STARTED,
    CALL_PRESETS,
    CALL_LEADER_BOARD,
    CALL_USER_CLICK,
    CALL_RESET_GAME,
    CALL_MODAL_CLOSED,
    DELETE_WINNER
} from '../actions/actions'


export const setStart = () => ({type: SET_STARTED, payload: true})
//**********************

export const getPresetsFromServer =  () => ({type: CALL_PRESETS})
//**********************

export const getLeaderBoard = () => ({type: CALL_LEADER_BOARD})
//**********************

export const onUserClick = (e) => ({type: CALL_USER_CLICK, payload: {e}})
//**********************

export const setModalClosed = () => ({type: CALL_MODAL_CLOSED})
//**********************

export const setResetGame = () => ({type: CALL_RESET_GAME})
//**********************

export const handleChange = (e, name) => ({type: SET_VALUES, payload: {name, value: e.target.value}})
//**********************

export const handleSliderChange = (name, value) => ({type: SET_SLIDER_VALUES, payload: {name, value}})
//**********************

export const deleteWinner = (_id) => ({type: DELETE_WINNER, payload: _id})