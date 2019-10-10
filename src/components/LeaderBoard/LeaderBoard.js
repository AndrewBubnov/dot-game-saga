import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { getLeaderBoard, deleteWinner } from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Modal from "../Modal/Modal";
import styles from './LeaderBoard.module.css'

const LeaderBoard = ({ getLeaderBoard, leaderBoard, deleteWinner }) => {

    useEffect(() => {
        getLeaderBoard()
    }, []);


    const leaderList = leaderBoard.map(item =>
        <div key={item._id} className={styles.leaderBoardItem} onClick={() => deleteWinner(item._id)}>
            <div className={styles.record}>Winner: {item.winner}</div>
            <div className={styles.record}>Date: {item.date}</div>
        </div>);

    return (
        <>
            <div className={styles.leaderBoardClass}>
                {leaderList}
            </div>
            <Modal/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        leaderBoard: state.leaderBoard,
    }
}

LeaderBoard.propTypes = {
    getLeaderBoard: PropTypes.func,
    deleteWinner: PropTypes.func,
    leaderBoard: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        winner: PropTypes.string,
        date: PropTypes.string,
    })),
}

export default connect(mapStateToProps, { getLeaderBoard, deleteWinner })(LeaderBoard)
