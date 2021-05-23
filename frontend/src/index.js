import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './Reducer/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import SignUp from './components/Pages/SignIn';
const initialVal={
  
  ListOfBlogs:[],
  authentication:{},
  loginErrors:null,
  signUpErrors:null,
  showProfile:false,
  openPopup:false

}
const store=createStore(reducer,initialVal,composeWithDevTools())


ReactDOM.render(
  <Provider store={store}>
  <App />
  {/* <SignUp/> */}
  </Provider>
  
  

  ,document.getElementById('root')
);

// 