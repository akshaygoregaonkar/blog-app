import React,{useEffect} from 'react'
import BlogCards from './BlogCards'
import { connect } from 'react-redux'

function AllBlogs(Props) {

    const{authSucess}=Props

    useEffect(()=>{
        if(authSucess===null){
            console.log('err')

        Props.history.push('/sign-in')
       
        }


    },[])
    return (
        <div>
            <BlogCards BlogProp={Props} myblog={false}/>
            
        </div>
    )
}

const mapStateToProps =state=>({
    authSucess:state.authentication.token
    
})

export default connect(mapStateToProps)(AllBlogs)
