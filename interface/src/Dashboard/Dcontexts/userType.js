import { Roles } from './Roles'; 

export function getUserType() {
    const address = localStorage.getItem('address');
    if (!address) {
      return null;
    }
    
    let userType = null;
    try {
      userType = Roles.get(address);
    } catch (error) {
      console.error('An error occurred while retrieving the user type:', error);
    }
  
    return userType;
}

