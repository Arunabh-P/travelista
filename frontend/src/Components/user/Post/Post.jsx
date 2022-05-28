import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
    ConnectWithoutContact,
    VolunteerActivism
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost, updatePost } from "../../../Actions/Post"
import { getFollowingPosts, getMyPosts, loadUser } from "../../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

function Post({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    tripDate,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    width,
}) {

    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);



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
        await dispatch(deletePost(postId));
        dispatch(getMyPosts())
        dispatch(loadUser())
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
                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    #planed to trip on :   {tripDate}
                </Typography>


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
<Link to="/proposal">
                <Button className="InputOptions">

                    <VolunteerActivism />
                    <Typography className="buttonText" >Proposal</Typography>
                </Button>
                </Link>



                {isDelete ? (
                    <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button>
                ) : null}

            </div>
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
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

            <Dialog
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

            <Dialog
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

export default Post