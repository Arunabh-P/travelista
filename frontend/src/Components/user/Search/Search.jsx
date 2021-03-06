import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./Search.css"
import { getAllUsers } from '../../../Actions/User';
import User from "../User/User"
import search from "../../../../src/Images/search.png"
import Header from "../Header/CommonHeader"

function Search() {

    const [name, setName] = React.useState("");
    const dispatch = useDispatch();
    const { users } = useSelector(
        (state) => state.allUsers
    )

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllUsers(name))
    };

    return (
        <>
            <Header />
            <div className='search-user' >
                <div className="update-profile-headline p-5">
                    <h3>Search</h3>
                </div>
                <div className="container mb-4 bg-white ">
                    <div className="row update-row p-4 rounded">
                        <div className="col-md-6 update-img p-5">
                            <img src={search} className="text-center image-search-up" alt="" />
                            <form className="searchForm" onSubmit={submitHandler} >
                                <input
                                    className='search-input'
                                    type="text"
                                    value={name}
                                    placeholder="Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className="col-md-6 update-img searchResults-div px-5 searchResults d-block height-max">
                            {users &&
                                users.map((user) => (
                                    <User
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        avatar={user.avatar.url}
                                    />
                                ))}
                        </div>
                    </div>
                </div >
            </div >
        </>

    )
}

export default Search