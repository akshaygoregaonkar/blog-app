import { useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from "@material-ui/core";
import secureAxios from '../AxiosConfig/secureAxios'
import { useSelector, useDispatch } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    form: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },


}));



const initialValue = {
    title: '',
    category: '',
    thumbnail: '',
    excerpt: '',
    month: '',
    day: '',
    content: ' '
}

const CreateBlog = ({ setOpenPop, setOpenSnack, EditRecord, isEdit, setsnackMessage }) => {
    const [values, setValues] = useState(initialValue)
    const store = useSelector(state => state)
    const { authentication } = store
    const dispatch = useDispatch()
    useEffect(() => {
        if (EditRecord != null) {

            setValues({ ...EditRecord })
            console.log(EditRecord)
            console.log(values)


        }

    }, [EditRecord])



    const handleSubmit = (event) => {
        event.preventDefault()
        const BlogPost = new FormData()
        BlogPost.append("title", event.target['title'].value)
        BlogPost.append("category", event.target['category'].value)
        BlogPost.append("thumbnail", event.target['thumbnail'].files[0])
        BlogPost.append("excerpt", event.target['excerpt'].value)
        BlogPost.append("date", event.target['date'].value)
        BlogPost.append("content", event.target['content'].value)
        BlogPost.append("user", authentication.id)
        console.log(BlogPost)
        if (!isEdit) {


            secureAxios({
                url: 'blog/create',
                method: 'post',
                data: BlogPost,
            }).then(response => {

                setOpenPop(false);

                dispatch({ type: "BLOG_CREATED", payload: response.data });
                setOpenSnack(true);




            }).catch(error => console.log(error, "error while create/edit blog"))
        }
        else {

            secureAxios({
                url: `user/blog/${EditRecord.id}`,
                method: 'put',
                data: BlogPost,
            }).then(response => {
                setOpenPop(false)
                setOpenSnack(true);
                dispatch({ type: "UPDATE_BLOG", payload: response.data });
                setsnackMessage('BlogCards Updated Succesfully');
                //  setsnackMessage('BlogCards Deleted Succesfully');




                ;
            }).catch(error => console.log(error, "error while edit blog"))

        }

    }

    const classes = useStyles();

    const handleInputChange = e => {
        e.preventDefault()
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })


    }

    return (

        <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container>
                <Grid item xs={6}>

                    <div style={{ marginLeft: '30px' }}>
                        <TextField name="title" label="Title" variant="outlined"
                            required
                            value={values.title}
                            onChange={handleInputChange} />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label='Category'
                                name='category'
                                

                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value='world'>World</MenuItem>
                                <MenuItem value='environment'>Environment</MenuItem>
                                <MenuItem value='technology'>Technology</MenuItem>
                                <MenuItem value='design'>Design</MenuItem>
                                <MenuItem value='culture'>Culture</MenuItem>
                                <MenuItem value='business'>Business</MenuItem>
                                <MenuItem value='politics'>Politics</MenuItem>
                                <MenuItem value='world'>Science</MenuItem>
                                <MenuItem value='style'>Style</MenuItem>
                                <MenuItem value='travel'>Travel</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField name="excerpt" label="Excerpt" variant="outlined"
                            value={values.excerpt}

                            onChange={handleInputChange} required />
                        <div style={{ marginLeft: '10px', margin: '10px' }}>
                            <label >Select Thumbnail: </label>
                            <input

                                // className={classes.input}

                                variant="outlined"
                                type="file"
                                required
                                label="Thumbnail"
                                name="thumbnail"
                            />

                        </div>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            name='date'
                            defaultValue="2020-05-20"
                            variant="outlined" required
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // value={values.month}
                            onChange={handleInputChange}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>


                    <TextField
                        id="standard-multiline-static"
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={15}
                        required
                        placeholder=" Please Write your Content Here!"
                        value={values.content}
                        onChange={handleInputChange}

                    />

                    <div className={classes.root}>

                        <Button variant="contained" color="primary" type="submit" >Submit</Button>




                    </div>
                </Grid>

            </Grid>
        </form>


    )

}


export default CreateBlog