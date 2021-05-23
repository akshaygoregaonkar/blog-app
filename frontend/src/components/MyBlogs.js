
import BlogCards from './BlogCards'

import React,{useEffect} from 'react'
import { connect } from 'react-redux'
function MyBlogs(Props) {
    const{authSucess}=Props

    useEffect(()=>{
        if(authSucess===null){
            console.log('err')

        Props.history.push('/sign-in')
       
        }


    },[])
    return (
        <div>
            <BlogCards BlogProp={Props} myblog={true}/>
            
        </div>
    )
}



const mapStateToProps =state=>({
    authSucess:state.authentication.token
    
})

export default connect(mapStateToProps)(MyBlogs)
