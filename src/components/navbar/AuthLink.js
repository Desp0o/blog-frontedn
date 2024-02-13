import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthLink({linkName}) {
  return (
    <Link 
        to={linkName === 'Sign in' ? '/pages/SignIn' : '/pages/SignUp' } 
        className={linkName === 'Sign in' ? 'nav_auth_item_filled' : 'nav_auth_item_stroked' }
    >
        {linkName}
    </Link>
  )
}
