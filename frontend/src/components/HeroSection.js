import React from 'react'
import './HeroSection.css'
import '../App.css'
import { Button } from './Button'

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src='\videos\video-1.mp4' autoPlay loop muted />
            <h1> Welcome to Blog App!</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button link='/sign-in' className='btns' buttonStyle='btn--outline' buttonSize='btns--large'>
                    GET STARTED
                </Button>
               
            </div>



        </div>
    )
}

export default HeroSection
