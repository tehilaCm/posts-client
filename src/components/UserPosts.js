import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ImPencil2 } from "react-icons/im";

import UserPost from "./UserPost";
import PostForm from "./PostForm";
import Spinner from "./Spinner";

import { getPosts } from "../api";
import actions from "../actions";
import { useAuth } from "../contexts/AuthContext";

const UserPosts = ({ userPosts, setUserPosts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    setPosts();
  }, []);

  const setPosts = async () => {
    try {
      if (currentUser) {
        const { data } = await getPosts(currentUser.email);
        const { posts } = data;
        setUserPosts(posts);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5 sm-12">
            <PostForm userPost={post} setPost={setPost} />
          </div>
          <div className="col-md-7 sm-12">
            {userPosts.length === 0 && (
              <div style={{ display: "grid", flexWrap: "wrap" }}>
                <h1 className="header">You don't have any posts</h1>
                <ImPencil2 className="pancil" />
              </div>
            )}
            <div className="posts-container">
              {userPosts.map((item) => (
                <UserPost key={item._id} item={item} setPost={setPost} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userPosts: state.userPosts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserPosts: (posts) => dispatch(actions.setUserPosts(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
