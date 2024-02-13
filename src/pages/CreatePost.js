import React, { useState, useContext, useEffect } from 'react';
import {AuthContext} from '../components/AuthContext'
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/createpost.css';
import axios from 'axios';
import BlotFormatter from 'quill-blot-formatter';
import LoadingDiv from '../components/loadingDiv/LoadingDiv';

Quill.register('modules/blotFormatter', BlotFormatter);



export default function CreatePost() {
    const {currentUser} = useContext(AuthContext)
    const [content, setContent] = useState('');
    const [category, setcategory] = useState('')
    const [cover, setCover] = useState('')
    const [title, setTile] = useState('')
    const [loading,setLoading] = useState(false)


    const sendPost = async () => {
        

        if(title.length <= 0){
            alert(`Hey ${currentUser}, please fill Title field`)
        }else if(category.length <= 0){
            alert(`Hey ${currentUser}, please choose Category`)
        }else{
            
            if (content.trim() !== '') {

                const formData = new FormData();
                formData.append('title', title);
                formData.append('content', content);
                formData.append('category', category);
                formData.append('cover', cover);

                setLoading(true)
                try {
                    const response = await axios.post('http://localhost:3300/posts', formData, { withCredentials: true, headers: {'Content-Type': 'multipart/form-data',} });
                    
                    alert(response.data)
                    setTile('')
                    setcategory('')
                    setContent('')
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    if(error.response.statusText === 'Payload Too Large'){
                        alert(`Hey ${currentUser}, Image size or Dimension is too large`)
                    }

                    if(error.response.statusText === "Forbidden"){
                        alert("Not authenticated!")
                    }

                    console.log(error.response);
                }
            } else {
                alert('Content is empty; not sending the request.');
            }
        }   
    }



    const fileHandler = (e) => {
        setCover(e.target.files[0])
    }


    const modules = {
        blotFormatter: {},
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], // text color and background color
            [{ 'font': [] }], // font family
            [{ 'align': 'right' }, { 'align': 'center' }, { 'align': '' }, { 'align': 'justify' }],
            ['image'],
            ['link'], // add a link option
            ['video'], // add a video embed option
            ['clean'],
        ],
        clipboard: {
            matchVisual: true,
        },
        
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'code-block',
        'align', 'video', 'formula', 'table','color', 'background', 'font', 'script', 'size', 'blockquote', 'float'
    ];

    return (
        <div className='create_post'>

            

            <p className='crp_title'>Create New Post</p>
            

            <div className='create_post_inner'>

            {loading ? <LoadingDiv text='Creating Post' /> : <></>}

                <div className='input_fields'>
                    <div className='input_parent'>
                        <input
                            className='inputStyle_editor'
                            type='text'
                            name='title'
                            placeholder='title'
                            value={title}
                            onChange={(e)=> setTile(e.target.value)}
                        />
                    </div>

                    <div className='input_parent'>
                        <input
                            className='inputStyle_editor'
                            type='file'
                            name='cover'
                            onChange={fileHandler}
                        />
                    </div>

                    <div className='input_parent'>
                        <select id="selectInput" value={category} className='inputStyle_editor' onChange={(e) => setcategory(e.target.value)}>
                            <option value="">-- Select Category --</option>
                            <option value="Movie">Movie</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Sport">Sport</option>
                        </select>
                    </div>
                </div>

                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className='custom_editor'
                />

                <button className='textEditorBtn' onClick={sendPost}>send</button>

            </div>
            
        </div>
    );
}
