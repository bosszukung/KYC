import React from 'react'
import '../App.css'
import './About.css'

function About() {
    return(
        <div className='about'>
            <div className='about-container'>
                <h1>About US</h1>
                <h4>Revolutionise KYC With The Blockchain Web Application</h4>
                <p><b>Are you tired of slow and inefficient KYC processing?</b></p>  
                <p>Say hello to our cutting-edge web application! 
                    Designed specifically for financial institutions, 
                    our platform leverages the power of blockchain technology 
                    to guarantee the safety and security of your clients' data. 
                    But that's not all! we also incorporate advanced OCR technology from Azure, 
                    ensuring that every document is extracted with 100% accuracy. 
                    And to top it off, we take the security of our web application seriously, 
                    hosting it on the world-renowned AWS cloud platform. With our web app, 
                    you'll enjoy lightning-fast KYC processing, unparalleled accuracy, and unbeatable security. 
                    All in one easy-to-use platform.</p>
            </div>
        </div>
    )
}


export default About