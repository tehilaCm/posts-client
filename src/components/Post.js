import React from "react";
import { connect } from "react-redux";

import { AiFillStar } from "react-icons/ai";

import actions from "../actions";
import { savePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

import toast from "react-hot-toast";

const Post = ({ item, savePost, unsavePost, searches, isSearch = false }) => {
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
      toast.success("The post was saved!");
    }
  };

  const unsave = (item) => {
    toast.success("The post was unsaved!");
    unsavePost(item, currentUser.email);
  };

  const isFavoriteFunc = () => {
    const index = searches.findIndex((post) => item.id === post.id);
    if (index === -1) return false;
    return true;
  };

  const isFavorite = isFavoriteFunc();

  return (
    <div className="card post">
      <div className="card-body">
        {isFavorite && <AiFillStar />}
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text card-body">{item.body}</p>
        {!isSearch ? (
          !isFavorite ? (
            <button
              className="btn save-btn theme-color-btn"
              onClick={() => save(item)}
            >
              Save
            </button>
          ) : (
            <button
              className="btn save-btn theme-color-btn"
              onClick={() => unsave(item)}
            >
              Unsave
            </button>
          )
        ) : (
          <button
            className="btn save-btn theme-color-btn"
            onClick={() => unsave(item)}
          >
            Unsave
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
    unsavePost: async (post, email) => {
      dispatch(actions.unsavePost(post, email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
