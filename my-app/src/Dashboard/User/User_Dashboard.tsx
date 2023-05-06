import {useEffect} from 'react';
import { ColorModeContext, useMode } from '../Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import UTopbar from './Ucomponents/senes/manu/UTopbar';
import USidebar from './Ucomponents/senes/manu/USidebar'
import UDashboard from './UDashboard';



export function User({ setShowNavbar, showNavbar}: {
    setShowNavbar:Function; 
    showNavbar:boolean;
}) {
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
                        <USidebar />
                        <main className='content'>
                            <UTopbar  />
                            <div className='components'>
                                <UDashboard />
                            </div>
                        </main>   
                    </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

  export default User;
  