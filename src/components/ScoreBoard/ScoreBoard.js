import React from 'react'
import {connect} from 'react-redux'
import ScoreItem from "./ScoreItem/ScoreItem";
import * as PropTypes from "prop-types";
import './ScoreBoard.css'

const ScoreBoard = ({score: {computer, user}, winner, name}) => {
    const userName = name ? name : 'User'
    let scoreString = (
        <div style={{display: 'flex'}}>
            <ScoreItem number={ computer }/>
            <span>&nbsp;  :  &nbsp;</span>
            <ScoreItem number={ user }/>
        </div>
    )
    if (winner) {
        scoreString = winner !== 'Computer' ? <div className='success rotated-winner'>{userName} won</div>
            : <div className='danger rotated-winner'>computer won</div>
    }
    return (
        <div className='main-container'>
            <div className='score'>
                <div>Computer : { userName }</div>
                { scoreString }
            </div>
        </div>
    )
}

ScoreBoard.propTypes = {
    score: PropTypes.shape({
        user: PropTypes.number,
        computer: PropTypes.number,
    }),
    winner: PropTypes.string,
    name: PropTypes.string,
}

const mapStateToProps = (state) => {

    return {
        score: state.score,
        winner: state.winner,
        name: state.values.name,
    }
}

export default connect(mapStateToProps, null)(ScoreBoard)