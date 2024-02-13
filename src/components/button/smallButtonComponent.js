import React from 'react'

export default function SmallButtonComponent({text, funName}) {
  return (
    <p className='small_btn' onClick={funName}>{text}</p>
  )
}
