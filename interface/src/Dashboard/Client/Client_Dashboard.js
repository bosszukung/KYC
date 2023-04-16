import React, {useEffect} from 'react';
import { ColorModeContext, useMode } from '../Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CTopbar from './Ccomponents/senes/manu/CTopbar';
import CSidebar from './Ccomponents/senes/manu/CSidebar'
import { Outlet } from 'react-router-dom';


function Client({ setShowNavbar, showNavbar}) {
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
                        <CSidebar />
                        <main className='content'>
                            <CTopbar  />
                            <div className='components'>
                                <Outlet />
                            </div>
                        </main>   
                    </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

  export default Client;
  