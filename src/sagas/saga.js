import {
    CALL_PRESETS,
    SET_PRESETS,
    CALL_LEADER_BOARD,
    SET_LEADER_BOARD,
    SET_WINNER,
    CALL_START_GAME,
    SET_STARTED,
    CALL_USER_CLICK,
    SET_RANDOM_INDEX,
    SET_GAME_FIELD,
    CALL_TICK,
    SET_SCORE,
    SET_NEXT_GAME,
} from '../actions/actions'
import { takeLatest, call, put, all, select } from "redux-saga/effects";
import axios from "axios";
import {resetGame, setInitialField, setModalOpen} from "../actions/actionCreators";


export const presetUrl = 'http://starnavi-frontend-test-task.herokuapp.com/game-settings'
export const winnerUrl = 'http://starnavi-frontend-test-task.herokuapp.com/winners'
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];




export function* rootSaga () {
    yield all ([
        takeLatest(CALL_PRESETS, getPresets),
        takeLatest(CALL_LEADER_BOARD, getLeaderBoard),
        takeLatest(CALL_START_GAME, setStartGame),
        takeLatest(CALL_USER_CLICK, setUserClick),
        takeLatest(CALL_TICK, setGameProcess),
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
    const score = yield select (state => state.score)
    const name = yield select (state => state.name)
    const user = name ? name : 'User'
    const winner = score.user > score.computer ? user : 'Computer'
    const dateString = new Date().toLocaleString();
    const dateArray = dateString.split(',')[0].split('.')
    dateArray[1] = monthNames[Number(dateArray[1]) - 1]
    const date = dateArray.join(' ')
    const time = dateString.split(',')[1].split(':')
    time.splice(time.length - 1, 1)
    const dateTime = time.join(':') + ' ' + date

    yield put (resetGame())
    yield put ({type: SET_WINNER, payload: winner})
    yield put ({type: SET_NEXT_GAME, payload: true})
    try {
        const response = yield call(() => axios.post(winnerUrl, {winner, date: dateTime}))
        yield put ({type: SET_LEADER_BOARD, payload: response.data})
    } catch (err) {
        yield put (setModalOpen(`Sorry, something's gone wrong on server. Please try again!`))
    }
}

function* setStartGame() {
    const field = yield select (state => state.values.preset.field)
    yield put (setInitialField(field*field))
    yield put ({type: SET_NEXT_GAME, payload: false})
    yield put ({type: SET_WINNER, payload: ''})
    yield put ({type: SET_STARTED, payload: true})
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
    const { score, gameField, randomIndex, values: {preset: {field}} } = yield select (state => state)
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
    }
}

function* addScore (score, player, size) {
    const newScore = score[player] + 1
    yield put ({type: SET_SCORE, payload: {...score, [player]: newScore}})
    if (newScore > size/2) yield setWinner()
}