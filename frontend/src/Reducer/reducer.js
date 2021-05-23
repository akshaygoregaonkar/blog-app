import Action from '../Action/Actions'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case Action.AUTH_SUCCESS: {
            const { token, username, email, first_name, last_name,id } = action.payload
            const authState = {
                id:id,
                username: username,
                email: email,
                token: token,
                first_name: first_name,
                last_name: last_name
            }
            localStorage.setItem('id', authState.id)
            localStorage.setItem('username', authState.username)
            localStorage.setItem('token', authState.token)
            localStorage.setItem('email', authState.email)
            localStorage.setItem('first_name', authState.first_name)
            localStorage.setItem('last_name', authState.last_name)

            return { ...state, authentication: authState ,login:true,signUpErrors:null,loginErrors:null,id:null}
        }
        case Action.LOGOUT: {
            localStorage.clear()
            return { ...state, authentication: { id:null, token: null, username: null, email: null, first_name: null, last_name: null },login:false,signUpErrors:null,loginErrors:null}
        }
        case Action.AUTH_INITIATE:{
                const authState={
                    id:localStorage.getItem('id'),
                    username:localStorage.getItem('username'),
                    token:localStorage.getItem('token'),
                    email:localStorage.getItem('email'),
                    first_name:localStorage.getItem('first_name'),
                    last_name:localStorage.getItem('last_name')
                }
                return{...state,authentication:authState,login:true,signUpErrors:null,loginErrors:null}
            }
            case Action.SIGNIN_ERRORS:{
                return{...state,loginErrors:action.payload,signUpErrors:null}
            }
          case Action.SIGNUP_ERROR:{
                return{...state,signUpErrors:action.payload,loginErrors:null}
            }
            case Action.ADD_LIST_BLOG:{
                return {...state,ListOfBlogs:action.payload}

            }
            case Action.BLOG_CREATED:{
                return {...state,ListOfBlogs:[...state.ListOfBlogs,action.payload]}
            }
            case Action.POPUP:{
                return {...state,openPopup:action.payload}
            }
            case Action.SHOW_PROFILE:{
                return {...state,showProfile:action.payload}
            }
            case Action.DELETE_BLOG:{
                return { ...state, ListOfBlogs: [...state.ListOfBlogs.slice(0, action.payload), ...state.ListOfBlogs.slice(action.payload + 1)] }
                // return{...state,ListOfBlogs:[...state.ListOfBlogs.slice(0,action.paylod), ...state.ListOfBlogs.slice(action.payload+1)]}
            }
            case Action.UPDATE_BLOG:{
                let id=action.payload.id
                let index = -1
             state.ListOfBlogs.find((item, ind) => {
            if (item.id == id) {
                index = ind
                return true
            }
        })

            //    var id=action.payload.id
               
            //     var index=state.ListOfBlogs.findIndex((item,ind)=>id=item.id)
                 
        
                console.log(index,id)
            return { ...state, ListOfBlogs: [...state.ListOfBlogs.slice(0,index),action.payload,...state.ListOfBlogs.slice(index+1)] }


        }
        default: {
            return state
        }

    }
}