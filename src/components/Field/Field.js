import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { onUserClick, setTick, setResetGame } from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Cell from "../Cell/Cell";
import './Field.css'



const Field = ({values, started, gameField, onUserClick, setTick, setResetGame}) => {

    const {preset: {field = 5, delay = 2000}} = values

    useEffect(() => {
       let interval = null
       if (started){
           interval = setInterval(setTick, delay)
       }
       return () => clearInterval(interval)
    }, [started, delay])

    useEffect(() => {
        setResetGame()
    }, [field])


    const output = gameField.map((item, index) =>
        <Cell
            key={index}
            width={700 / field - 4}
            height={700 / field - 4}
            number={index}
            value={gameField[index]}
        />)

    return (
        <div className='field' onClick={onUserClick}>
            {output}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        values: state.values,
        started: state.started,
        gameField: state.gameField,
    }
}

Field.propTypes = {
    onUserClick: PropTypes.func,
    setTick: PropTypes.func,
    setResetGame: PropTypes.func,
    gameField: PropTypes.arrayOf(PropTypes.string),
    started: PropTypes.bool,
}

export default connect(mapStateToProps, { onUserClick, setTick, setResetGame })(Field)
