import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setEndGame, resetGame, setInitialField, onUserClick, setTick } from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Cell from "../Cell/Cell";
import './Field.css'



const Field = ({values, started, nextGame, resetGame, setInitialField, winner,
                   gameField, score, name, onUserClick, setTick}) => {

    const {preset: {field = 5, delay = 2000}} = values
    const size = field*field

    const user = name ? name : 'User'


    useEffect(() => {
        let interval = null
       if (started){
           interval = setInterval(setTick, delay)
       }
       return () => clearInterval(interval)
    }, [started, delay])

    useEffect(() => {
        setInitialField(size)
        resetGame()
    }, [field])


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
            <div className='field' onClick={onUserClick}>
                {output}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        values: state.values,
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
    onUserClick: PropTypes.func,
    setTick: PropTypes.func,
    resetGame: PropTypes.func,
    setInitialField: PropTypes.func,
    gameField: PropTypes.arrayOf(PropTypes.string),
    started: PropTypes.bool,
    nextGame: PropTypes.bool,
    score: PropTypes.shape({
        user: PropTypes.number,
        computer: PropTypes.number,
    }),
    winner: PropTypes.string,
    name: PropTypes.string,
}

export default connect(mapStateToProps, { setEndGame, resetGame, setInitialField, onUserClick, setTick })(Field)
