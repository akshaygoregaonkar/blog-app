import React, { } from 'react'
import '../Pages/SignIn.css'
import { Link } from 'react-router-dom'

import secureAxios from "../../AxiosConfig/secureAxios";
import axios from 'axios'

import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab';

function SignUp(Props) {
    const { authSuccess, signinErrors, registerErrors, AddListOfBlogs } = Props


    const handleSubmit = (e) => {
        e.preventDefault()


        var credentials = JSON.stringify({
            first_name: e.target['first_name'].value,
            last_name: e.target['last_name'].value,
            username: e.target['username'].value,
            email: e.target['email'].value,
            password: e.target['password'].value
        });
        console.log(credentials)

        axios({
            method: 'post',
            url: 'https://backend-blog-appp.herokuapp.com/signUp/',
            headers: {
                
                'Content-Type': 'application/json'
            },
            data: credentials
        }).then(res => {
            authSuccess(res?.data);
            secureAxios({
                url: 'blogs/',
                method: 'get'
            }).then(response => {
                AddListOfBlogs(response.data)

            }).catch(err => console.log("Error"))

            Props.history.push('/all-blogs')
            console.log(res?.data)
        }).catch(err => { signinErrors(err.response?.data); console.log("error") })



    }

    return (
        <div className='container'>
            <div className="form-container">
                {/* <div className="signin-signup"> */}

                <form onSubmit={handleSubmit} >
                    <h2 className="title">Sign Up </h2>
                    <div className="input-field">
                        <i className='fas fa-user' />

                        <input name='first_name' type='text' placeholder='First Name' autocomplete="off" required/>
                    </div>
                    <div className="input-field">
                        <i className='fas fa-user' />

                        <input name='last_name' type='text' placeholder='Last Name' autocomplete="off" required/>
                    </div>
                    {registerErrors && registerErrors.username && <Alert severity="warning"> {registerErrors.username[0]}

— <strong>check it out!</strong> </Alert>}

                    <div className="input-field">
                        <i className='fas fa-user' />

                        <input name='username' type='text' placeholder='Username' autocomplete="off" required/>
                    </div>

                    {registerErrors && registerErrors.email && <Alert severity="warning"> {registerErrors.email[0]}

— <strong>check it out!</strong> </Alert>}
                    <div className="input-field">
                        <i className='fas fa-envelope' />
                        <input name='email' type='text' placeholder='Email' autocomplete="off" required/>
                    </div>
                    
                        {registerErrors && registerErrors.password && <Alert severity="warning"> {registerErrors.password[0]}

— <strong>check it out!</strong> </Alert>}
<div className="input-field">

                        <i className='fas fa-lock' />
                        <input name='password' type="password" placeholder='Password' autocomplete="off" required />

                    </div>
                    <button type='submit' className='btnn solid' >SignUp</button>

                    <h3>One of us ?</h3>

                    <Link to='/sign-in' >

                        Sign In
                               
                    </Link>

                </form>

            </div>


        </div>








    )
}


const mapStatetoProps = (state) => ({
    registerErrors: state.signUpErrors

})
const mapDispatchToProps = dispatch => ({
    authSuccess: auth => dispatch({ type: 'AUTH_SUCCESS', payload: auth }),
    signinErrors: error => dispatch({ type: "SIGNUP_ERROR", payload: error }),
    AddListOfBlogs: val => dispatch({ type: "ADD_LIST_BLOG", payload: val })

})

export default connect(mapStatetoProps, mapDispatchToProps)(SignUp)