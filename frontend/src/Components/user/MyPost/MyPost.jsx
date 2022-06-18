import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost, updatePost } from "../../../Actions/Post"
import { getFollowingPosts, getMyPosts, loadUser } from "../../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import BuddyRequest from "../BuddyRequest/BuddyRequest";
import HostRequest from "../HostRequest/HostRequest";
import "./MyPost.css"
const Swal = require('sweetalert2')

function MyPost({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    // tripDate,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    width,
    host = [],
    buddy = [],
}) {
    console.log(buddy);
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);
    const [hostRequestToggle, setHostRequestToggle] = useState(false);
    const [buddyRequestToggle, setBuddyRequestToggle] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)

    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getFollowingPosts())
        }
    }

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue))
        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getFollowingPosts())
        }
    }

    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId))
        dispatch(getMyPosts())
    }

    const deletePostHandler = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deletePost(postId))
                dispatch(getMyPosts())
                dispatch(loadUser())
            }
        })
    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        });
    }, [likes, user._id]);

    return (
        <div className="post" style={{ width: width }}>
            <div className="postHeader">
                {isAccount ? (
                    <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>
                ) : null}
            </div>
            <img src={postImage} alt="Post" />
            <div className="postDetails">
                <Avatar src={ownerImage} alt="user"
                    sz={{
                        height: "3vmax",
                        width: "3vmax"
                    }}
                />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {caption} </Typography>
                {/* <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {tripDate}
                </Typography> */}
            </div>
            <Button
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    margin: "1vmax 2vmax",
                }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} likes</Typography>
            </Button>
            <div className="postFooter">
                <Button onClick={handleLike} className="InputOptions">
                    {liked ? <Favorite /> : <FavoriteBorder />}
                </Button>
                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>
                <Button onClick={() => setHostRequestToggle(!hostRequestToggle)} className="InputOptions">
                    <Typography className="buttonText2" >Host Requests</Typography>
                </Button>
                <Button onClick={() => setBuddyRequestToggle(!buddyRequestToggle)} className="InputOptions">
                    <Typography className="buttonText2" >Buddy Requests</Typography>
                </Button>
                {isDelete ? (
                    <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button>
                ) : null}
            </div>
            <Dialog className="Dialogbox-scroll" open={buddyRequestToggle} onClose={() => setBuddyRequestToggle(!buddyRequestToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Buddy Requests</Typography>
                    <hr />
                    {buddy.map((buddy) => (
                        <>
                            <BuddyRequest
                                key={buddy._id}
                                name={buddy.name}
                                number={buddy.number}
                                place={buddy.place}
                                description={buddy.description}
                            />
                            <hr />
                        </>
                    ))}
                </div>
            </Dialog>
            <Dialog className="Dialogbox-scroll" open={hostRequestToggle} onClose={() => setHostRequestToggle(!hostRequestToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Host Requests</Typography>
                    <hr />
                    {host.map((host) => (
                        <>
                            <HostRequest
                                key={host._id}
                                name={host.name}
                                number={host.number}
                                place={host.place}
                                service={host.service}
                                description={host.description}
                            />
                            <hr />
                        </>
                    ))}
                </div>
            </Dialog>
            <Dialog className="Dialogbox-scroll" open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>
            <Dialog className="Dialogbox-scroll"
                open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here..."
                            required
                        />
                        <Button className="add-button" type="submit" variant="contained"  >
                            Add
                        </Button>
                    </form>
                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                        ))
                    ) : (
                        <Typography>No comments Yet</Typography>
                    )}
                </div>
            </Dialog>
            <Dialog className="Dialogbox-scroll"
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Update caption</Typography>
                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption Here..."
                            required
                        />
                        <Button className="add-button" type="submit" variant="contained"  >
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

export default MyPost