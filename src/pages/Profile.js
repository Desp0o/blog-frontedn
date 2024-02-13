import React, {useContext} from 'react'
import {AuthContext} from "../components/AuthContext"
import "../pages/styles/profile.css"
import UserInfo from '../components/profileComponents/UserInfo'
import UsersLastPosts from '../components/profileComponents/UsersLastPosts'

export default function Profile() {

  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <div className='profile_Main'>
        <div className='profile_inner'>

            <h1 className='profile_header'>Hi {currentUser}</h1>

            <div className='profile_content'>

                <UserInfo />

                <UsersLastPosts />

            </div>

            
        </div>
      </div>
    </>
  )
}
