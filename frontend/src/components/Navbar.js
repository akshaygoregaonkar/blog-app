import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import './Navbar.css'
import { useSelector } from 'react-redux'
import Popup from './Popup'
import CreateBlog from './CreateBlog'
import CustomSnackbar from './CustomSnakbar'
export default function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const[Open,setOpen]=useState(false)
  const [openSnack, setOpenSnack] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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


  const store = useSelector(state => state)
  const { login } = store
  return (<>


    <nav className="navbar">
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Blog App

          </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

        {! login && <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
              </Link>
          </li>}


          {login &&<>

            <li className='nav-item'>

<Link
  to='/all-blogs'
  className='nav-links'
  onClick={closeMobileMenu}
>
  ALL BLOGS
 
</Link>

</li>
<li className='nav-item'>

<Link
  to='/my-blogs'
  className='nav-links'
  onClick={closeMobileMenu}
>
  MY BLOGS
 
</Link>
</li>
          </>
          
          }


          {!login && <li>
            <Link
              to='/sign-in'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign In
              </Link>
          </li>}
          {login && (<>
            <li>
            
            <Link
             
              className='nav-links-mobile'
              onClick={()=>setOpen(true)}
            >
             CREATE BLOG
              </Link>
          </li>
          
          <li>
            <Link
              to='/sign-out'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Out
              </Link>
          </li>
          
          
          
          
         </> )}


        </ul>
       {button && login && <Button onClick={()=>setOpen(true)} buttonStyle='btn--outline'> CREATE BLOG</Button>}

        {button && <Button link={login ? 'sign-out' : '/sign-in'} buttonStyle='btn--outline'> {!login ? 'SIGN IN' : 'SIGN OUT'}</Button>}

      </div>
      <CustomSnackbar openSnack={openSnack}
                message='BlogCards Created Succesfully'

                setOpenSnack={setOpenSnack} />
      <Popup
    openPopup={Open}
    setOpenPop={setOpen}
    title="Create BlogCards">
<CreateBlog setOpenPop={setOpen} setOpenSnack={setOpenSnack}  />
    </Popup>
 
    </nav>



  </>)
}
