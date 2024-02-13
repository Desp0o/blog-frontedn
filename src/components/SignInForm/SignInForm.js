import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import ButtonComponent from '../button/buttonComponent'
import LoadingDiv from "../loadingDiv/LoadingDiv"

export default function SignInForm() {

  const navigate = useNavigate()
  const {setCurrentUSer, setCurrentMail, tokenStatus, setRefreshToken} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({mail:'', password:''})
  const [response, setResponse] = useState('')

  useEffect(()=>{
    if(tokenStatus === 'token-valid'){
      navigate('/')
    }
  },[tokenStatus, navigate])

  const handleValues = (e)=>{
      setValues(prevValues => ({...prevValues, [e.target.name]: e.target.value,}));
  }

  const getValues = async ()=> {
    setLoading(true)
    try {
          const response = await axios.post("http://localhost:3300/users/login", values, {
                                            withCredentials: true, 
                                            headers: {'Content-Type': 'application/json',}
                                            });
    
          const user = localStorage.setItem('user', JSON.stringify(response?.data.name)) 
          const mail = localStorage.setItem('mail', JSON.stringify(response?.data.mail)) 
          const refreshTokenStorage = localStorage.setItem('refreshToken', JSON.stringify(response?.data.refreshToken)) 
          
          setRefreshToken(refreshTokenStorage)
          setCurrentUSer(user) //set username from localstorage to context
          setCurrentMail(mail) //set mail from localstorage to context
          
          window.location.href='/'
          setValues({mail:'', password:''}) //clear inputs
          setLoading(false)
      } catch (error) {
        setResponse(error.response.data.error);
        console.error('Error:', error);
        setLoading(false)
      }
  }

  return (
    <>
    {loading ? <LoadingDiv text="Logging in" /> : <></>}

    <div className='signUp_form_inside'>
        <div className='input_parent'>
            <input className='inputStyle' type='text' name='mail' id='mail' placeholder='Email' value={values.mail} onInput={handleValues}/>
        </div>

        <div className='input_parent'>
            <input className='inputStyle' type='password' name='password' id='password' placeholder='Password' value={values.password} onInput={handleValues}/>
        </div>

        <ButtonComponent text='Log In' funName={getValues} />

        <p className='signUp_response_error'>{response}</p>
    </div>
    </>
  )
}
