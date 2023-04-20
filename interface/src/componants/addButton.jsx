import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import {Pressable} from 'react-native';
import './addButton.css';

export const AddButton = ({
    add,
    route,
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
