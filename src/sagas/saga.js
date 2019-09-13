import {
    CALL_PRESETS,
    SET_PRESETS,
    CALL_LEADER_BOARD,
    SET_LEADER_BOARD,
    CALL_END_GAME,
    SET_WINNER,
    CALL_START_GAME,
    SET_STARTED
} from '../actions/actions'
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import axios from "axios";
import { getScore, getName, getField } from "../store";
import {resetGame, setInitialField, setModalOpen, setNextGame} from "../actions/actionCreators";


export const presetUrl = 'http://starnavi-frontend-test-task.herokuapp.com/game-settings'
export const winnerUrl = 'http://starnavi-frontend-test-task.herokuapp.com/winners'
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export function* rootSaga () {
    yield all ([
        takeLatest(CALL_PRESETS, getPresets),
        takeLatest(CALL_LEADER_BOARD, getLeaderBoard),
        takeLatest(CALL_END_GAME, setWinner),
        takeLatest(CALL_START_GAME, setStartGame),
    ]);
}


function* getPresets() {
    try {
        const response = yield call (() => axios.get(presetUrl))
        yield put ({type: SET_PRESETS, payload: response.data})
    } catch (err) {
        const presets = {
            easyMode: {field: 5, delay: 2000},
            hardMode: {field: 15, delay: 900},
            normalMode: {field: 10, delay: 1000},
        }
        yield put (setModalOpen(`Can not get presets from server. The mock data will be used.`))
        yield put ({type: SET_PRESETS, payload: presets})
    }
}


function* getLeaderBoard() {
    try {
        const response = yield call (() => axios.get(winnerUrl))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put (setModalOpen(`Can not get leader board from server. Please try to refresh the page.`))
    }
}

function* setWinner() {
    const score = yield select (getScore)
    const name = yield select (getName)
    const user = name ? name : 'User'
    const winner = score.user > score.computer ? user : 'Computer'
    const dateString = new Date().toLocaleString();
    const dateArray = dateString.split(',')[0].split('.')
    dateArray[1] = monthNames[Number(dateArray[1]) - 1]
    const date = dateArray.join(' ')
    const time = dateString.split(',')[1].split(':')
    time.splice(time.length - 1, 1)
    const dateTime = time.join(':') + ' ' + date

    yield put ({type: SET_WINNER, payload: winner})
    yield put (resetGame())
    yield put (setNextGame(true))
    try {
        const response = yield call(() => axios.post(winnerUrl, {winner, date: dateTime}))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put (setModalOpen(`Sorry, something's gone wrong on server. Please try again!`))
    }
}

function* setStartGame() {
    const field = yield select (getField)
    yield put (setInitialField(field * field))
    yield put (setNextGame(false))
    yield put ({type: SET_WINNER, payload: ''})
    yield put ({type: SET_STARTED, payload: true})
}