import React from 'react'
import {Link} from 'react-router-dom'

export default function NavLinkItem({linkName,path}) {
  return (
    <Link to={path} className='nav_link_item'>{linkName}</Link>
  )
}
