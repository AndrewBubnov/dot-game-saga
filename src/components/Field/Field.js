import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { onUserClick, setResetGame } from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Cell from "../Cell/Cell";
import './Field.css'



const Field = ({ field, gameField, onUserClick, setResetGame }) => {

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
        field: state.values.preset.field,
        gameField: state.gameField,
    }
}

Field.propTypes = {
    onUserClick: PropTypes.func,
    setResetGame: PropTypes.func,
    gameField: PropTypes.arrayOf(PropTypes.string),
    started: PropTypes.bool,
}

export default connect(mapStateToProps, { onUserClick, setResetGame })(Field)
