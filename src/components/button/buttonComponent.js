import React from 'react'

export default function ButtonComponent({text, funName}) {
  return (
    <div className='signUp_btn' onClick={funName}>{text}</div>
  )
}
