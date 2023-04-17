import { Roles } from './Roles'; 

export function getUserType() {
    const address = localStorage.getItem('address');
    if (!address) {
      return null;
    }
    try {
      return Roles.get(address) || null ;
    } catch (error) {
      console.error('An error occurred while retrieving the user type:', error);
      return null;
    }
  
}

