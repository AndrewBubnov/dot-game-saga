import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: grey,
    },
    typography: {useNextVariants: true}
})



export const controlStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%',
        height: 50,
        margin: 0,
        padding: 0,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    button: {
        width: '100%',
        height: 50,
        margin: 0,
        padding: 0,
    },
    textField: {
        width: '100%',
        height: 50,
        margin: 0,
        padding: 0,
    },
    slider: {
        color: '#808080'
    },
}));
