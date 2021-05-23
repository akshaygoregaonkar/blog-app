import CloseIcon from '@material-ui/icons/Close'
import { Button, Dialog, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core"
import {useDispatch} from 'react-redux'


const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

const Popup = (Props) => {
    const classes = useStyles()
    const {title, openPopup, setOpenPop, children } = Props
     const dispatch = useDispatch()

    return (

        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
             <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() =>{ setOpenPop(false); dispatch({ type: 'POPUP', payload: false })}}
                        >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
 
              

    )
}
export default Popup