import React, { useState } from 'react'
import '../Pages/SignIn.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import secureAxios from "../../AxiosConfig/secureAxios";
import '../../App.css'
import { Alert } from '@material-ui/lab';
import axios from 'axios'




function SignIn(Props) {
    const { authSuccess } = Props
    const { signinErrors, loginErrors, AddListOfBlogs } = Props


    const handleSubmit = (e) => {
        e.preventDefault()
        const credentials = JSON.stringify({
            username: e.target['username'].value,
            password: e.target['password'].value
        });

        axios({
            method: 'post',
            url: 'https://backend-blog-appp.herokuapp.com/signIn/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: credentials
        }).then(Response => {
            authSuccess(Response?.data)

            secureAxios({
                url: 'blogs/',
                method: 'get'
            }).then(response => {
                AddListOfBlogs(response.data)

            }).catch(err => console.log("Error"))

            Props.history.push('/all-blogs');
            console.log(Response?.data)
        }).catch(err => { signinErrors(err.response?.data.message); console.log('Error') })
        console.log(credentials)
    }








    return (
        <div className='container'>
            <div className="form-container">
                {/* <div className="signin-signup"> */}

                <form onSubmit={handleSubmit} >
                    <h2 className="title">Sign In </h2>
                    {loginErrors && <Alert severity="warning"> {loginErrors}

— <strong>check it out!</strong> </Alert>}


                    <div className="input-field">
                        <i className='fas fa-user' />

                        <input name='username' autocomplete="off" type='text' placeholder='Username' required/>
                    </div>
                    {loginErrors && loginErrors.password && <Alert severity="warning"> {loginErrors.password[0]}

— <strong>check it out!</strong> </Alert>}
                   

                    

<div className="input-field">

                        <i className='fas fa-lock' />
                        <input name='password' autocomplete="off" type="password" placeholder='Password'  required/>

                    </div>
                    <button type='submit' className='btnn solid' >Login</button>
                    <h3>New Here? ?</h3>

                    <Link to='/sign-up' >

                        Sign Up
                               
                    </Link>

                </form>



              


            </div>


        </div>


    )
}


const mapStatetoProps = state => ({
    loginErrors: state.loginErrors

})
const mapDispatchToProps = dispatch => ({
    authSuccess: auth => dispatch({ type: 'AUTH_SUCCESS', payload: auth }),
    signinErrors: error => dispatch({ type: "SIGNIN_ERRORS", payload: error }),
    AddListOfBlogs: val => dispatch({ type: "ADD_LIST_BLOG", payload: val })

})
export default connect(mapStatetoProps, mapDispatchToProps)(SignIn)
