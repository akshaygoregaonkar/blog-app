import { Snackbar,makeStyles} from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))
const CustomSnackbar=(Props)=>{
    const classes=useStyles()

    const {openSnack,message,setOpenSnack}=Props
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };


    return(
        <Snackbar className={classes.root} open={openSnack} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success">
            <AlertTitle>Success</AlertTitle>
                 {message}
                       </Alert>
    </Snackbar>
    )
}
export default CustomSnackbar