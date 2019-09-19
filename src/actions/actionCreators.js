import {
    SET_VALUES,
    SET_SLIDER_VALUES,
    CALL_START_GAME,
    CALL_PRESETS,
    CALL_LEADER_BOARD,
    CALL_USER_CLICK,
    CALL_TICK,
    CALL_RESET_GAME,
    CALL_MODAL_CLOSED
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

export const setModalClosed = () => ({type: CALL_MODAL_CLOSED})
//**********************

export const setResetGame = () => ({type: CALL_RESET_GAME})
//**********************

export const handleChange = (e, name) => ({type: SET_VALUES, payload: {name, value: e.target.value}})
//**********************

export const handleSliderChange = (name, value) => ({type: SET_SLIDER_VALUES, payload: {name, value}})