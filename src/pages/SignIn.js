import React from 'react'
import SignInForm from '../components/SignInForm/SignInForm'

export default function SignIn() {
  return (
    <>
       <div className='signUp'>
          <h2 className='signUp_title'>Sign In</h2>

          <div className='signUp_form'>
            <SignInForm />
          </div>

      </div>
    </>
  )
}
