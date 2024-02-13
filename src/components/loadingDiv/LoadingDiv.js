import React from 'react'
import './LoadingDiv.css'

export default function LoadingDiv({text}) {
  return (
    <div className='loading_div'>
        <p>{text}</p>
    </div>
  )
}
