import React from 'react'
import * as PropTypes from "prop-types";
import styles from './ScoreItem.module.css'

const ScoreItem = ({ number }) => {
    return <span className={styles.rotatedScore} key={number}>{number}</span>
}

ScoreItem.propTypes = {
    number: PropTypes.number,
}

export default ScoreItem
