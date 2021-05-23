import '../../App.css'
import {useSelector} from 'react-redux'

import React from 'react'
import HeroSection from '../HeroSection'


function Home(Props) {
    const Store=useSelector(state=>state)
    const {login}=Store
    return (
        <>
    {!login && <HeroSection/> }

    
    
            
        </>
    )
}

export default Home
