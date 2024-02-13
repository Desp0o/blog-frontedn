import React, { useState } from 'react'
import axios from "axios"
import ButtonComponent from '../button/buttonComponent'
import LoadingDiv from "../loadingDiv/LoadingDiv"

export default function SignUpForm() {

    const [values, setValues] = useState({name:'', mail:'', password:'', password2:''})
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)


    const handleValues = (e)=>{
        setValues(prevValues => ({...prevValues, [e.target.name]: e.target.value,}));
    }

    const sendValues = async ()=> {
      setLoading(true)
        try {
            const response = await axios.post("http://localhost:3300/users", values);
            console.log(response.data);
            setResponse(response.data)

            setValues({name:'', mail:'', password:'', password2:''})
            setLoading(false)
          } catch (error) {
            setResponse(error.response.data);
            console.error('Error:', error);
            setLoading(false)
          }
    }

  return (
    <>
    {loading ? <LoadingDiv text="Creating User" /> : <></>}

    <div className='signUp_form_inside'>
        <div className='input_parent'>
            <input className='inputStyle' type='text' name='name' id='name' placeholder='User Name' value={values.name} onInput={handleValues}/>
        </div>

        <div className='input_parent'>
            <input className='inputStyle' type='text' name='mail' id='mail' placeholder='Email' value={values.mail} onInput={handleValues}/>
        </div>

        <div className='input_parent'>
            <input className='inputStyle' type='password' name='password' id='password' placeholder='Password' value={values.password} onInput={handleValues}/>
        </div>

        <div className='input_parent'>
            <input className='inputStyle' type='password' name='password2' id='repassword' placeholder='Repeat Password' value={values.password2} onInput={handleValues}/>
        </div>

          <label className="file" htmlFor="file">
            Upload Image
          </label>

        <ButtonComponent text='Register' funName={sendValues} />

        <p className={response === 'You have successfully registered' ? 'signUp_response' : 'signUp_response_error'}>{response}</p>
    </div>
    </>
  )
}
