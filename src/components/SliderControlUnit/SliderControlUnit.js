import React from 'react'
import {connect} from 'react-redux'
import {handleSliderChange} from '../../actions/actionCreators'
import * as PropTypes from 'prop-types';
import {controlStyles as useStyles, theme} from '../../styles/styles'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'


const SliderControlUnit = ({values, handleSliderChange}) => {
    const {field, delay} = values.preset
    const classes = useStyles();

    const handleSlider = name => (e, value) => {
        handleSliderChange(name, value)
    }

    return (
        <div style={{width: 700}}>
            <MuiThemeProvider theme={theme}>
                <Typography gutterBottom className={classes.slider}>
                    Field size
                </Typography>
                <Slider
                    onChange={handleSlider('field')}
                    value={field}
                    valueLabelDisplay="auto"
                    step={1}
                    min={5}
                    max={20}
                />
                <Typography gutterBottom className={classes.slider}>
                    Delay
                </Typography>
                <Slider
                    onChange={handleSlider('delay')}
                    value={delay}
                    valueLabelDisplay="auto"
                    step={100}
                    min={700}
                    max={2000}
                />
            </MuiThemeProvider>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        values: state.values,
    }
}

SliderControlUnit.propTypes = {
    handleSliderChange: PropTypes.func,
    values: PropTypes.shape({
        preset: PropTypes.shape({
            field: PropTypes.number,
            delay: PropTypes.number,
        }),
        name: PropTypes.string,
    }),
}

export default connect(mapStateToProps, {handleSliderChange})(SliderControlUnit)
