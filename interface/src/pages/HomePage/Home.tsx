import React from 'react'
import '../../App.css'
import { Button } from 'native-base'
import { Link } from "react-router-dom";
import './Home.css'

function Home() {
    return (
        <>
            <div className='home-container'>
                <h1>Automate KYC on Blockchian</h1>
                <h4>Simplify KYC Compliance with The Blockchain Integration</h4>
                <div className="home-btn">
                    <Link to="/login">
                        <Button my="2" alignSelf="center">
                            Get Start
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Home