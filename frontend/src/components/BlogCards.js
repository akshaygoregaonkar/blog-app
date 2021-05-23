import secureAxios from '../AxiosConfig/secureAxios'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import localconfig from '../config';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close'

import CustomSnackbar from './CustomSnakbar';
import { makeStyles } from "@material-ui/core";

import Popup from './Popup';
import CreateBlog from './CreateBlog';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 450,
        align: 'center',
        margin: '10px',
        marginTop:'20px',
        border:'1px solid black'
    },
    media: {
        height: 0,
        paddingTop: '46.25%', // 16:9
    },
   
    
    newButton: {
        position: 'absolute',
        right: '10px',
        color: "blue"
    },
 

}));



const BlogCards = (Props) => {
    const {myblog}=Props
    const state = useSelector(state => state)
    const { ListOfBlogs ,authentication} = state
    const [shoBlog, setshoBlog] = useState([]);

    
    useEffect(()=>{
        if(!myblog){
           setshoBlog(ListOfBlogs)
        }else{
            const blog=ListOfBlogs.filter(item => item.user == authentication.id)
            setshoBlog(blog)
        }

    },[ListOfBlogs])


    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setsnackMessage] = useState('')
    const [Open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [EditRecord, setEditRecord] = useState(null)


    const dispatch = useDispatch()
    const classes = useStyles();

    

    
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };
    const handleEdit = (blog) => {
        setOpen(true)
        setEditRecord(blog)
        setIsEdit(true) 
        setsnackMessage('BlogCards Updated Succesfully');
   
       


    }

    const handleDelete = (id) => {
        let index = -1
        ListOfBlogs.find((item, ind) => {
            if (item.id == id) {
                index = ind
                return true
            }
        })

        console.log("index", index, "id", id)
        secureAxios({
            url: `user/blog/${id}`,
            method: "delete"
        }).then(response => {
            setOpenSnack(true);
           
            dispatch({ type: "DELETE_BLOG", payload: index }); console.log(response.data)
            setsnackMessage('BlogCards Deleted Succesfully');
        }).catch(error => console.log("error"))
       }
    
      




    return (
        <div>
            {shoBlog.map((blog,index)=>
              <div key={index} style={{ float: 'left', marginLeft: '50px' }}>
            <Card className={classes.root}>
                <CardHeader
                    
                    action={
                         <>{ myblog && (<div>
    
                        {blog.user == authentication.id ? <div> <IconButton> <EditIcon onClick={() => handleEdit(blog)} /></IconButton>
                            <IconButton> <CloseIcon onClick={() => handleDelete(blog.id)} /> </IconButton>
    
                        </div>
                            : <></>}
    
                    </div>)}</>
    
                        }
                    title={blog.title}
    
    
                />
                <CardMedia
                    className={classes.media}
                    image={`${localconfig.host}${blog.thumbnail}`}
                    title={`${blog.user_details.first_name} ${blog.user_details.last_name}`}
                />
                <CardContent>
    
                    <Typography > <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blog.category)}</strong>
                    </Typography>
                    <Typography>
                        <div className="mb-1 text-muted">Auther : {`${blog?.user_details.first_name} ${blog?.user_details.last_name}`}</div>
                        <div className="mb-1 text-muted"> Date: {blog.date}</div>
    
                    </Typography>
    
                    <Typography >
                        {blog.excerpt}
                    </Typography>
                    <hr />
                    <Typography >
                    
                        <p>{blog.content}</p>
                     
                        </Typography>

                  
                </CardContent>
                 </Card>
                 </div>)}
           
    
         
                    
             <CustomSnackbar openSnack={openSnack}
                message={snackMessage}

                setOpenSnack={setOpenSnack} />
          
            <Popup
                openPopup={Open}
                setOpenPop={setOpen}

                title="Edit BlogCards">

                <CreateBlog setsnackMessag={setsnackMessage} setOpenPop={setOpen} setOpenSnack={setOpenSnack} isEdit={isEdit} EditRecord={EditRecord} />
            </Popup>
           

            </div>
    )

}

export default BlogCards




