import React from 'react'
import {connect} from "react-redux";
import { setModalClosed } from "../../actions/actionCreators";
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'




const Transition = React.forwardRef((props, ref) => {
    return <Slide ref={ref} direction="up" {...props} />
})

const Modal = ({ modalOpen, setModalClosed, errorMessage }) => {
    return(
        <Dialog
            open={ modalOpen }
            TransitionComponent={Transition}
            keepMounted
            onClose={setModalClosed}
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{textAlign: 'center'}}>
                    { errorMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={setModalClosed} style={{color: "#575757"}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const mapStateToProps = (state) => {
    return {
        modalOpen: state.modalOpen,
        errorMessage: state.errorMessage,
    }
}

Modal.propTypes = {
    setModalClosed: PropTypes.func,
    modalOpen: PropTypes.bool,
    errorMessage: PropTypes.string,
}



export default connect(mapStateToProps, { setModalClosed })(Modal)