import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MapSingleUserPost from './mapSingleUserPost'

export default function UsersLastPosts() {

    const [data, setData] = useState([].reverse())
    const [visibleElement, setvisibleElement] = useState(9)
    const [loading, setLoading] = useState(false)
    const [isMapping, setIsMapping] = useState(false)
    const pageSize = 10
    const postsContentRef = useRef(null);

    const handleScroll = () => {
        const div = postsContentRef.current;
        const scrollPosition = div.scrollTop;
        const scrollHeight = div.scrollHeight;
        const clientHeight = div.clientHeight;
    
        if (scrollPosition + clientHeight >= scrollHeight - 100 && !loading) {
        
            setLoading(true);
    
            setTimeout(() => {
            setvisibleElement((prevvisibleElement) => prevvisibleElement + pageSize);
            setLoading(false);
        }, 0); 
        }
    };

    useEffect(() => {
        const div = postsContentRef.current;
        div.addEventListener("scroll", handleScroll);
        return () => {
        div.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3300/posts/:id', ({withCredentials: true}))
                setData(response.data)
                setIsMapping(true)
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserPosts()
    },[])

  return (
    <div className='user_posts'>
        <p className='user_posts_header'>User's last posts</p>

        <div className='last_posts_content' ref={postsContentRef}>

        {isMapping ?  <MapSingleUserPost data={data.slice(0, visibleElement)} /> : 'Loading...' }
            
        </div>
    </div>
  )
}
