import React from 'react'
import {connect} from 'react-redux'
import ScoreItem from "./ScoreItem/ScoreItem";
import * as PropTypes from "prop-types";
import styles from './ScoreBoard.module.css'

const ScoreBoard = ({score: {computer, user}, winner, name}) => {
    const userName = name ? name : 'User'
    const scoreString = (
        <div className={styles.scoreBox}>
            <ScoreItem number={computer}/>
            <span>&nbsp;  :  &nbsp;</span>
            <ScoreItem number={user}/>
        </div>
    )

    const winnerString = winner !== 'Computer' ? <div className={`${styles.success} ${styles.rotatedWinner}`}>{userName} won</div>
        : <div className={`${styles.danger} ${styles.rotatedWinner}`}>computer won</div>

    return (
        <div className={styles.score}>
            <div>Computer : {userName}</div>
            {winner ? winnerString : scoreString}
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
