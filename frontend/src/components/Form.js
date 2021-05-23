import {  makeStyles } from "@material-ui/core"

const useStyles=makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width:"80%",
            margin:theme.spacing(1)
        }

    }

}))
const Form=(Props)=>{
    const classes=useStyles()

   

    return (
         <form onSubmit={handleSubmit} className={classes.root}>
            {Props.children}
        </form>

    )
}
export default Form