import {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Logout=(Props)=>{
useEffect(()=>{

    Props.LogOut()
},[])
return(<div>
    <Redirect to='/'/>
</div>)

}
const mapDispatchToProps=dispatch=>({
    LogOut:()=>dispatch({type:"LOGOUT"})
})
export default connect(null,mapDispatchToProps)(Logout)