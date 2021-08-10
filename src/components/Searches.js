import React, { useEffect } from "react";
import { connect } from "react-redux";

import Post from "../components/Post";

import actions from "../actions";
import { getSearches } from "../api";
import { useAuth } from "../contexts/AuthContext";

const Searches = ({ searches, getSearches }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) getSearches(currentUser.email);
  }, []);

  if (searches.length === 0) {
    return (
      <div>
        <h1 className="header">You don't have any saved posts</h1>;
      </div>
    );
  }
  return (
    <div>
      <h1 className="header">Saved Posts</h1>
      <div className="posts-container">
        {searches.map((item) => (
          <Post key={item.id || item._id} item={item} isSearch={true} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searches: state.searches.posts,
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

export default connect(mapStateToProps, mapDispatchToProps)(Searches);
