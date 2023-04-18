import {Button} from '../../componants/Button';
import React from 'react';
import 'ErrorPage.css'

export function ErrorPage() {
    return (
        <div className='error'>
            <div className='container'>
                <h1>404</h1>
                <h1>Page Not Found</h1>
                <h4>Please Check Your URL</h4>
            </div>
            <div className="error-btn">
                    <Button 
                    path='/'
                    className="btns" 
                    buttonstyle='btn--outline' 
                    buttonsize='button--lagre'
                    >
                        Back to HomePage
                    </Button>
                </div>
        </div>
    );
};

export default ErrorPage;