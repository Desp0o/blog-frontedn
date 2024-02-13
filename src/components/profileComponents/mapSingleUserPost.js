import React from 'react'
import SmallButtonComponent from '../button/smallButtonComponent'
import { Link } from "react-router-dom"

export default function MapSingleUserPost({data}) {

  
  return (
    <>
        {data?.map((post)=>{
            return(
              
                <div className='last_post_single' key={post.postid}>
                    <p className='user_last_post_title'>{post.title.length > 15 ? post.title.substring(0, 15) + '...' : post.title}</p>
                    
                    <Link to={`/pages/singlepost/${post.postid}`}>
                      <SmallButtonComponent text='Visit' id={post.postid} />
                    </Link>

                    <Link to={`/pages/EditPost/${post.postid}`}>
                      <SmallButtonComponent text='Edit' />
                    </Link>
                    
                   
                </div>
              
            )
        })}
    </>
  )
}
