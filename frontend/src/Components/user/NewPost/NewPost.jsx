import React, { useState } from 'react'
import "./NewPost.css"
import { Button, Dialog, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { createNewPost } from '../../../Actions/Post';
import { loadUser } from "../../../Actions/User"
import PostAddIcon from '@mui/icons-material/PostAdd';

function NewPost() {

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("")
  const [tripDate, setTripDate] = useState("")
  const dispatch = useDispatch()
  const [newPostToggle, setNewPostToggle] = useState(false)
  const { loading } = useSelector((state) => state.like)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(createNewPost(caption, image, tripDate))
    dispatch(loadUser());
  }

  return (
    <>
      <div className="add-a-new-post">
        <Button className="add-new-post-button" style={{ color: "rgba(0, 0, 0, 0.767)" }} onClick={() => setNewPostToggle(!newPostToggle)}>
          Add post <PostAddIcon />
        </Button>
      </div>
      <Dialog open={newPostToggle} onClose={() => setNewPostToggle(!newPostToggle)}>
        <div className="newPost">
          <form className="newPostForm" onSubmit={submitHandler}>
            <Typography varient="h3">New Post</Typography>
            {image && <img src={image} alt="postImage" />}
            <input type="file" accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder='Caption...'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input type="date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} />
            <Button disabled={loading} type="submit">Post</Button>
          </form>
        </div>
      </Dialog>

    </>
  )
}

export default NewPost