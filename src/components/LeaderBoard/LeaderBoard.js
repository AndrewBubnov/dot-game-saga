import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getLeaderBoard} from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import Modal from "../Modal/Modal";
import './LeaderBoard.css'

const LeaderBoard = ({getLeaderBoard, leaderBoard}) => {

    useEffect(() => {
        getLeaderBoard()
    }, [])

    const leaderList = leaderBoard.map(item => <div key={item.id} className='leader-board-item'>
        <div className='record'>Winner: {item.winner}</div>
        <div className='record'>Date: {item.date}</div>
    </div>)
    return (
        <>
            <div className='leader-board'>
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
    leaderBoard: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        winner: PropTypes.string,
        date: PropTypes.string,
    })),
}

export default connect(mapStateToProps, {getLeaderBoard})(LeaderBoard)