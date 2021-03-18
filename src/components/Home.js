import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import Post from "./Post";

import { useAuth } from "../contexts/AuthContext";

import actions from "../actions";
import { getSearches, getPosts } from "../api";

const Home = ({ posts, setPosts, getSearches }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((apiPosts) => {
        getPosts(currentUser.email).then((res) => {
          const { data } = res;
          const { posts } = data;
          setPosts(apiPosts.concat(posts));
        });
      });
    setIsLoading(false);
    if (currentUser) getSearches(currentUser.email);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="posts-container">
        {posts.map((item) => (
          <Post key={item.id || item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPosts: (posts) => dispatch(actions.setPosts(posts)),
    getSearches: async (email) => {
      try {
        const { data } = await getSearches(email);
        dispatch(actions.setSearches(data.searches));
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
