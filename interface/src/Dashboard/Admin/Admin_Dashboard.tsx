import React, {useEffect} from 'react';
import { ColorModeContext, useMode } from '../Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './Acomponents/senes/manu/Topbar';
import Sidebar from './Acomponents/senes/manu/Sidebar'
import { Outlet } from 'react-router-dom';


function Admin({ setShowNavbar, showNavbar}) {
    useEffect(() => {
      setShowNavbar(showNavbar);
      return () => setShowNavbar(true);
    }, [setShowNavbar, showNavbar]);

    const [theme, colorMode] = useMode();
    
    return (  
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                 <CssBaseline />
                    <div className='dashboard'>
                        <Sidebar />
                        <main className='content'>
                            <Topbar  />
                            <div className='components'>
                                <Outlet />
                            </div>
                            
                        </main>   
                    </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

  export default Admin;
  