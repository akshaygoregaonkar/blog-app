import {useEffect} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import Home from './components/Pages/Home';
import Logout from './components/Logout';
import secureAxios from './AxiosConfig/secureAxios'

import MyBlogs from './components/MyBlogs'
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'
import ErrorBoundary from './components/ErrorBoundry';
import AllBlogs from './components/AllBlogs';
function App(Props) {
  const{authInitiate,AddListOfBlogs}=Props
    useEffect(()=>{
        if(localStorage.getItem('username')){
        authInitiate()
        secureAxios({
            url:'blogs/',
            method:'get'
        }).then(response=>{
            AddListOfBlogs(response.data)

        }).catch(err=>console.log("Error"))

    }


    },[])
  return (
    <div className="App">
      <BrowserRouter>
      <ErrorBoundary>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/my-blogs' component={MyBlogs} />
          <Route exact path='/all-blogs' component={AllBlogs} />
          <Route exact path='/sign-out' component={Logout} />
          

        </Switch>
        </ErrorBoundary>

      </BrowserRouter>

    </div>
  );
}



const mapStateToProps=state=>({ListOfBlogs:state.ListOfBlogs }) 
const mapDispatchToProps=dispatch=>({
    authInitiate:()=>dispatch({type:'AUTH_INITIATE'}),
    AddListOfBlogs:val=>dispatch({type:"ADD_LIST_BLOG",payload:val})


})


export default connect(mapStateToProps,mapDispatchToProps)(App);
