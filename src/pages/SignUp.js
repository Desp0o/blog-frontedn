import React from 'react'
import './styles/SignUp.css'
import SignUpForm from '../components/signUpForm/SignUpForm'

export default function SignUp() {
  return (
    <>
      <div className='signUp'>
          <h2 className='signUp_title'>Sign Up</h2>

          <div className='signUp_form'>
            <SignUpForm />
          </div>

      </div>
    </>
  )
}
