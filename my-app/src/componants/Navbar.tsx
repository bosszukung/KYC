import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    const [click, setclick] = useState(false);
    const [button, setButton] = useState(true)
    
    const handleclick = () => setclick(!click);
    const closeMobileMenu = () => setclick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);
    
    window.addEventListener('resize', showButton);
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    KYCC 
                    <i className="fas fa-key" />
                </Link>
                <div className='menu-icon' onClick={handleclick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                            Dashboard
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                            About
                        </Link>
                            </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links nav-links-mobile' onClick={closeMobileMenu}>
                            Log In
                        </Link>
                    </li>
                </ul>
                {button}
            </div>     
        </nav>
    </>
  )
};

export default Navbar