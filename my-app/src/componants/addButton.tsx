import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import {Pressable} from 'react-native';
import './addButton.css';
import React from 'react';

export const AddButton = ({
    add,
    route,
}:{
    add: string;
    route: string;
}) => {
    const navigate = useNavigate();
    return (
        <Pressable onPress={() => navigate(route)}>
            <div className='press'>
                <AddCircleOutlineIcon className='icon' />
                <span className='text'>Add</span>
                {add}
            </div>
        </Pressable>
    )
}
