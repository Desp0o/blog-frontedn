import React,{ useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import './Navbar.css'
import NavLinkItem from './NavLinkItem'
import AuthLink from './AuthLink'
import { Link } from 'react-router-dom'
import SmallButtonComponent from '../button/smallButtonComponent'

import avatar from "../../utils/icons/avatar.png"

export default function Navbar() {
    const {currentUser,logOutHandler, tokenStatus} = useContext(AuthContext)

    const [userDashBoard,setUserDashBoard] = useState('avatar_dashboard_closed')
    
  return (
    <>
        <div className='navbar'>
            <h2 className='nav_header'>Blog</h2>

            <div className='nav_menu'>
                <div className='nav_links'>
                    <NavLinkItem linkName='Home' path='/'/> 
                    <NavLinkItem linkName='Recipes' path='/pages/Recipes'/>
                    <NavLinkItem linkName='About Me' />
                    <NavLinkItem linkName='Blog' />
                    <NavLinkItem linkName='profile' path='/pages/Profile'/>
                    
                </div>

                {currentUser !== null ? 
                    <div className='authorized_user' onMouseLeave={()=> setUserDashBoard('avatar_dashboard_closed')}> 
                        <img src={avatar} className='avatar' alt='user avatr' onClick={()=> setUserDashBoard('avatar_dashboard')}/>

                        <div className={userDashBoard}>
                            <Link to='/pages/Profile'>Profile</Link>
                            <Link to='/pages/CreatePost'>Create Post</Link>
                            <p className='logout_btn' onClick={logOutHandler}>Log Out</p>
                        </div>

                    </div>
                        : 
                    <div className='nav_auth'>
                        <AuthLink linkName='Sign in'/>
                        <AuthLink linkName='Sign Up'/>
                    </div>
                }

                
            </div>
        </div>
    </>
  )
}
