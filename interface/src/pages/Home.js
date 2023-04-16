import React from 'react'
import '../App.css'
import {Button} from '../componants/Button'
import './Home.css'

function Home() {
    return (
        <>
            <div className='home-container'>
                <h1>Automate KYC on Blockchian</h1>
                <h4>Simplify KYC Compliance with The Blockchain Integration</h4>
                <div className="home-btn">
                    <Button 
                    path='/login'
                    className="btns" 
                    buttonstyle='btn--outline' 
                    buttonsize='button--lagre'
                    >
                        GET STARTED
                    </Button>
                </div>
            </div>
        </>
        
    )
};

export default Home