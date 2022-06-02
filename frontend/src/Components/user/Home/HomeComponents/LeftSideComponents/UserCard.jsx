import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from "react-redux"
import User from "../../../User/User"
import cover from "../../../../../Images/cover.jpg"
import widget from "../../../../../Images/widget.gif"
import wave from "../../../../../Images/wave.gif"


import "./UserCard.css"
import { getUserProfile } from '../../../../../Actions/User'
function UserCard() {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { followed } = useSelector((state) => state.like)
  // const [refresh,setRefresh] = useState(false)
  //   useEffect(() => {
  //   if(!followed){
  //     setRefresh(!refresh)
  //   }

  // }, [refresh]);
  const [date, setDate] = useState('')
  function getDate() {
    let date = new Date()
    let hours = date.getHours()
    if (hours > 0 && hours < 12) {
      setDate('Good Morning')
    }
    else if (hours >= 12 && hours < 16) {
      setDate('Good Afternoon')
    }else if (hours >= 16 && hours < 21) {
      setDate('Good Evening')
    }

    else if (hours >= 21 && hours < 24) {
      setDate('Good Night')
    }
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <div className='user-card-for-side '>
      <div className='user-card'>
        <div className='user-card-top'>
          <img src={cover} alt="here cover image" />
          <Avatar src={user.avatar.url} className='user-card-avatar' />
          <h2>{user.name}</h2>
          <h4>{user.bio}</h4>
        </div>
      </div>

      <div className='user-followers-list d-none d-md-block'>
        <img src={widget} className="pt-3 widget-card" alt="here cover image" />
        <h3 className="pt-3">Hi {user.name},</h3>
        <h4>{date}!</h4>
        <img src={wave} className="pt-3  wave-card" alt="here cover image" />


        {/* {
                    user && user.following.length > 0 ? user.following.map((follow) => ((
                      <User
                        key={follow._id}
                        userId={follow._id}
                        name={follow.name}
                        avatar={follow.avatar.url}
                      />
                    ))
                    ) : (
                      <Typography style={{ margin: "2vmax" }}> You're not following anyone</Typography>
                    )} */}
      </div>
    </div>
  )
}

export default UserCard