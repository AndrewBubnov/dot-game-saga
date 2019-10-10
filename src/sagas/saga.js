import {
    SET_PRESETS,
    SET_LEADER_BOARD,
    SET_WINNER,
    SET_STARTED,
    SET_RANDOM_INDEX,
    SET_GAME_FIELD,
    SET_SCORE,
    SET_NEXT_GAME,
    SET_MODAL_OPEN,
    SET_ERROR_MESSAGE,
    DELETE_WINNER,
    CALL_RESET_GAME,
    CALL_PRESETS,
    CALL_LEADER_BOARD,
    CALL_USER_CLICK,
    CALL_MODAL_CLOSED,
} from '../actions/actions'


import { takeLatest, call, put, all, select, delay } from "redux-saga/effects";
import axios from "axios";
import { dateTime } from "../utils/utils";

export const presetUrl = 'https://dot-game-api.herokuapp.com/api/presets';
export const winnerUrl = 'https://dot-game-api.herokuapp.com/api/winner';

const presetError = `Can not get presets from server. The mock data will be used.`;
const leaderBoardError = `Can not get leader board from server. Please try to refresh the page.`;
const serverSaveError = `Sorry, something's gone wrong on server. Please try again!`;



export function* rootSaga () {
    yield all ([
        takeLatest(CALL_PRESETS, getPresets),
        takeLatest(CALL_LEADER_BOARD, getLeaderBoard),
        takeLatest(CALL_USER_CLICK, setUserClick),
        takeLatest(CALL_RESET_GAME, setInitialField),
        takeLatest(CALL_MODAL_CLOSED, setModalClosed),
        takeLatest(SET_STARTED, callProcess),
        takeLatest(DELETE_WINNER, deleteWinner),
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
        yield put ({type: SET_MODAL_OPEN, payload: true})
        yield put ({type: SET_ERROR_MESSAGE, payload: presetError})
        yield put ({type: SET_PRESETS, payload: presets})
    }
}


function* getLeaderBoard() {
    try {
        const response = yield call (() => axios.get(winnerUrl))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put ({type: SET_MODAL_OPEN, payload: true})
        yield put ({type: SET_ERROR_MESSAGE, payload: err.message || leaderBoardError})
    }
}

function* setWinner() {
    const score = yield select (state => state.score)
    const name = yield select (state => state.values.name)
    const user = name ? name : 'User'
    const winner = score.user > score.computer ? user : 'Computer'
    yield put ({type: SET_WINNER, payload: winner})
    yield put ({type: SET_SCORE, payload: {computer: 0, user: 0}})
    yield put ({type: SET_NEXT_GAME, payload: true})
    try {
        const response = yield call(() => axios.post(winnerUrl, {winner, date: dateTime()}))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put ({type: SET_MODAL_OPEN, payload: true})
        yield put ({type: SET_ERROR_MESSAGE, payload: err.message || serverSaveError})
    } finally {
        yield put ({type: SET_STARTED, payload: false})
    }
}

function* setUserClick(params) {
    const id = Number(params.payload.e.target.id.substring(1))
    const { score, gameField, randomIndex, winner, values: {preset: {field}} } = yield select (state => state)
    const size = field*field
    if (id === randomIndex && gameField[randomIndex] !== 'user' && !winner){
        let array = [...yield select(state => state.gameField)]
        array[randomIndex] = 'user'
        yield put ({type: SET_GAME_FIELD, payload: array})
        yield addScore(score, 'user', size)
    }
}

function* setGameProcess() {
    const { score, gameField, randomIndex, values: {preset: {field, delay: del}} } = yield select (state => state)
    const size = field*field
    if (score.computer <= size/2 && score.user <= size/2){
        const array = [...gameField]
        if (gameField[randomIndex] === 'current') {
            array[randomIndex] = 'computer'
            yield addScore(score, 'computer', size)
        }
        let index = null
        while (score.computer <= size/2 || score.user <= size/2) {
            index = Math.floor(Math.random() * size)
            if (gameField[index] === '') break
        }
        array[index] = 'current'
        yield put ({type: SET_RANDOM_INDEX, payload: index})
        yield put ({type: SET_GAME_FIELD, payload: array})
        yield delay(del)
        yield setGameProcess()
    }
}

function* addScore (score, player, size) {
    const newScore = score[player] + 1
    yield put ({type: SET_SCORE, payload: {...score, [player]: newScore}})
    if (newScore > size/2) yield setWinner()
}

function* setInitialField () {
    const field = yield select (state => state.values.preset.field)
    const gameField = (Array.from({length: field*field}, v => ''))
    yield put ({type: SET_GAME_FIELD, payload: gameField})
    yield put ({type: SET_SCORE, payload: {computer: 0, user: 0}})
}


function* setModalClosed() {
    yield put ({type: SET_MODAL_OPEN, payload: false})
    yield put ({type: SET_ERROR_MESSAGE, payload: ''})
}

function* callProcess(params) {
    if (params.payload) {
        yield setInitialField()
        yield put ({type: SET_NEXT_GAME, payload: false})
        yield put ({type: SET_WINNER, payload: ''})
        yield setGameProcess()
    }
}

function* deleteWinner(params) {
    try {
        const response  = yield call (() => axios.delete(`api/delete/${params.payload}`))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put ({type: SET_MODAL_OPEN, payload: true})
        yield put ({type: SET_ERROR_MESSAGE, payload: err.message})
    }
}
