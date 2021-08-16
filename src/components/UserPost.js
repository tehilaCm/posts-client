import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { connect } from "react-redux";

import { deletePost } from "../api";
import actions from "../actions";
import { useAuth } from "../contexts/AuthContext";

const UserPost = ({ item, deleteUserPost, setPost }) => {
  const { currentUser } = useAuth();

  const handleEdit = () => {
    setPost(item);
  };

  const handleDelete = async () => {
    try {
      deleteUserPost(item._id);
      if (currentUser) await deletePost(currentUser.email, item._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card post">
      <div className="card-body">
        <p className="creation-time">Created: {item.dateCreated + " " + item.timeCreated}</p>
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text card-body">{item.body}</p>
        <div className="container">
          <div className="row">
            <div className="col s-3">
              <FiEdit3 className="edit-icon" onClick={handleEdit} />
            </div>
            <div className="col s-3">
              <BsTrash className="trash-icon" onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserPost: (id) => dispatch(actions.deleteUserPost(id)),
  };
};

export default connect(null, mapDispatchToProps)(UserPost);
