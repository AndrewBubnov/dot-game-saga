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
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: 0,
        height: 50,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '32%',
        height: 55,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: 8,
        height: 50,
    },
    slider: {
        color: '#808080'
    },
}));
