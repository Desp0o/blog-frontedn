import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import "./styles/singlePostPage.css"


export default function SignlePost() {

    const { postId } = useParams();
    const [data, setData] = useState('')

    const fetchSinglePost = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3300/posts/singleposts/${id}`, {
            withCredentials: true
          })
          console.log(response.data)
          setData(response.data)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=>{
        fetchSinglePost(postId)
    },[postId])  


  return (
    <div className='single_post'>
        <div className='single_post_inner'>
          <p>{data?.title}</p>
          <p>{data?.category}</p>
          <img src={data.cover} />
          <div className='content_single_p' dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
    </div>
  )
}
