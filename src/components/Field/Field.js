import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setEndGame, setScore, setGameField, resetGame, setInitialField } from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Cell from "../Cell/Cell";
import './Field.css'



const Field = ({field = 5, delay = 2000, started, nextGame, setEndGame, setScore,
                   setGameField, resetGame, setInitialField, winner, gameField, score, name}) => {

    const size = field*field

    const [tick, setTick] = useState(0)
    const [randomIndex, setRandomIndex] = useState(null)
    const intervalRef = useRef

    const user = name ? name : 'User'
    const finishCondition = score.computer > size/2 || score.user > size/2

    useEffect(() => {
        setInitialField(size)
        resetGame()
    }, [field])


    useEffect(() => {
        if (finishCondition) {
            setEndGame()
            clearInterval(intervalRef.current)
        }
    }, [finishCondition])

    useEffect(() => {
        if (started) intervalRef.current = setInterval(() => setTick(t => t + 1), delay)
        return () => clearInterval(intervalRef.current)
    }, [intervalRef, started, delay])


    useEffect(() => {
        if (started && !finishCondition) {
            let array = [...gameField]
            if (gameField[randomIndex] === 'current') {
                array[randomIndex] = 'computer'
                setScore(score, 'computer')
            }
            const index = randomCell()
            array[index] = 'current'
            setRandomIndex(index)
            setGameField(array)
        }
    }, [tick])


    const randomCell = () => {
        while (!finishCondition) {
            const random = Math.floor(Math.random() * size)
            if (gameField[random] === '') {
                return random
            }
        }
    }

    const handleClick = (e) => {
        if (Number((e.target.id).substring(1)) === randomIndex && gameField[randomIndex] !== 'user' && !winner) {
            let array = [...gameField]
            array[randomIndex] = 'user'
            setGameField(array)
            setScore(score, 'user')
        }
    }

    const output = gameField.map((item, index) =>
        <Cell
            key={index}
            width={700 / field - 4}
            height={700 / field - 4}
            number={index}
            value={gameField[index]}
        />)

    let scoreString = <div>{score.computer} : {score.user}</div>
    if (nextGame && !started) {
        scoreString = winner !== 'Computer' ? <div className='success'>{ user } won</div>
            : <div className='danger'>computer won</div>
    }

    return (
        <div className='main-container'>
            <div className='score'>
                <div>Computer : { user }</div>
                {scoreString}
            </div>
            <div className='field' onClick={handleClick}>
                {output}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        field: state.field,
        delay: state.delay,
        score: state.score,
        started: state.started,
        nextGame: state.nextGame,
        name: state.values.name,
        gameField: state.gameField,
        winner: state.winner,
    }
}

Field.propTypes = {
    setEndGame: PropTypes.func,
    setScore: PropTypes.func,
    setGameField: PropTypes.func,
    resetGame: PropTypes.func,
    setInitialField: PropTypes.func,
    gameField: PropTypes.arrayOf(PropTypes.string),
    started: PropTypes.bool,
    nextGame: PropTypes.bool,
    field: PropTypes.number,
    delay: PropTypes.number,
    score: PropTypes.shape({
        user: PropTypes.number,
        computer: PropTypes.number,
    }),
    winner: PropTypes.string,
    name: PropTypes.string,
}

export default connect(mapStateToProps, { setEndGame, setScore, setGameField, resetGame, setInitialField })(Field)
