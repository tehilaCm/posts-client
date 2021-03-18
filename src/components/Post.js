import React from "react";
import { connect } from "react-redux";

import actions from "../actions";
import { savePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

const Post = ({ item, savePost, searches, isSearch = false }) => {
  const { currentUser } = useAuth();

  const save = (item) => {
    const index = searches.findIndex((post) => {
      if (item.id) {
        if (item.id === post.id) return post;
      } else {
        if (item._id === post._id) return post;
      }
      return null;
    });
    if (index === -1) {
      if (currentUser) savePost(item, currentUser.email);
      alert("Post was saved!");
    }
  };
  return (
    <div className="card post">
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text card-body">{item.body}</p>
        {!isSearch && (
          <button
            className="btn save-btn theme-color-btn"
            onClick={() => save(item)}
          >
            Save
          </button>
        )}
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
    savePost: async (post, email) => {
      dispatch(actions.savePost(post, email));
      try {
        await savePost({ post, email });
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
