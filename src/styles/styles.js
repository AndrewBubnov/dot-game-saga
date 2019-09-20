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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(7),
        width: '100%',
        height: 50,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(1),
        width: '100%',
        height: 55,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(7),
        width: '100%',
        height: 50,
    },
    slider: {
        color: '#808080'
    },
}));
