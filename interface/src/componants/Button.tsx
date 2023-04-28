import './Button.css';
import {Link} from 'react-router-dom';
import React from "react"   

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--meduim', 'btn--large'];


export const Button = ({
    children, 
    type, 
    onClick, 
    buttonstyle, 
    path,
    buttonsize}:{
        children: any;
        type:any;
        onClick: any; 
        buttonstyle: any; 
        path: any
        buttonsize: any
    }) => {
        const checkbuttonStyle = STYLES.includes(buttonstyle) 
        ? buttonstyle 
        : STYLES[0];

        const checkbuttonSize = SIZES.includes(buttonsize) 
        ? buttonsize 
        : SIZES[0];


    return (
        <Link to={path} className='btn-mobile'>
            <button 
            className={`btn ${checkbuttonStyle} ${checkbuttonSize}`}
            onClick={onClick}
            type={type}>
                {children}
            </button>
        </Link>
    );
};