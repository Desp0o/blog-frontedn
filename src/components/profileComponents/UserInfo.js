import React, {useContext, useState} from 'react'
import {AuthContext} from "../../components/AuthContext"
import ButtonComponent from '../../components/button/buttonComponent'
import axios from 'axios'
import LoadingDiv from "../loadingDiv/LoadingDiv"

export default function UserInfo() {

  const { currentUser, currentMail } = useContext(AuthContext)
  const [values, setValues] = useState({})
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false) 
  const handleUpdatePasswordValues = (e)=>{
    setValues(prevValues => ({...prevValues, [e.target.name]: e.target.value,}));
  }

  const updateUserInfo = async () => {

    if(values.newPassword.length < 6){
      setData('Password Must Be Longer Then 6 Char')
    }else{
      setLoading(true)
      try {
        const response = await axios.post('http://localhost:3300/users/updateuser', values, ({withCredentials: true}))
        console.log(response.data);
        setData(response?.data.message)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setData(error?.response?.data?.error)
        setLoading(false)
      }
    }
    
  }

  return (
   <>
    {loading ? <LoadingDiv text='Updating Pass' /> : <></>}

   <div className='user_info'>
      <p className='user_info_title'>User Info</p>
      <div className='input_parent'>
          <input className='inputStyle' type='text' name='name' id='name' placeholder='User Name' value={currentUser} disabled/>
      </div>

      <div className='input_parent'>
          <input className='inputStyle' type='text' name='userEmail' id='userEmail' placeholder='User mail' value={currentMail} disabled/>
      </div>

      <div className='input_parent'>
          <input className='inputStyle' type='password' name='currentPassword' id='currentPassword' placeholder='Current Password' value={values.currentPassword} onChange={handleUpdatePasswordValues}/>
      </div>

      <div className='input_parent'>
          <input className='inputStyle' type='password' name='newPassword' id='newPassword' placeholder='Enter New Passwrord' value={values.newPassword} onChange={handleUpdatePasswordValues}/>
      </div>

      <ButtonComponent text='Update Password' funName={updateUserInfo} />
      <p className={data === 'Password updated successfully' ? 'user_info_status' : 'user_info_status_error'}>{data}</p>
    </div>
   </>
  )
}
