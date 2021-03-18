import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import actions from "../actions";
import { post, updatePost } from "../api";
import { useAuth } from "../contexts/AuthContext";

import Alert from "./Alert";

const PostForm = ({ saveUserPost, userPost, setPost, updateUserPost }) => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const [error, setError] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    if (userPost) {
      titleRef.current.value = userPost.title;
      bodyRef.current.value = userPost.body;
    }
  }, [userPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    if (!title || !body) {
      setError("You must fill both fields");
    } else {
      setError("");
      titleRef.current.value = "";
      bodyRef.current.value = "";

      const formData = {
        title,
        body,
      };
      
      if (currentUser && currentUser) {
        try {
          if (userPost) {
            updateUserPost({ id: userPost._id, post: formData });
            await updatePost(currentUser.email, userPost._id, formData);
            setPost(null);
          } else {
            const { data } = await post(currentUser.email, formData);
            const { newPost } = data;
            saveUserPost(newPost);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <h2 className="center theme-color-h">
          {userPost ? "Edit" : "Add"} a post
        </h2>
        {error && <Alert message={error} />}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={titleRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Body
          </label>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: "100px" }}
            ref={bodyRef}
          ></textarea>
        </div>
        <button className="btn theme-color-btn">
          {userPost ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserPost: (post) => dispatch(actions.saveUserPost(post)),
    updateUserPost: ({ id, post }) =>
      dispatch(actions.updateUserPost({ id, post })),
  };
};

export default connect(null, mapDispatchToProps)(PostForm);
