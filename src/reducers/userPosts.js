import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  posts: [],
};

const posts = {
  setUserPosts(state, action) {
    state.posts = action.payload;
  },
  saveUserPost(state, action) {
    state.posts.push(action.payload);
  },
  updateUserPost(state, action) {
    const {id, post} = action.payload;
    state.posts.map((item) => {
      if (id === item._id) {
        item.title = post.title;
        item.body = post.body;
      }
      return item;
    });
  },
  deleteUserPost(state, action) {
    state.posts = state.posts.filter((item) => item._id !== action.payload);
  },
};

const reducer = produce((state, action) => {
  handler(state, action, posts);
}, initialState);

export default reducer;
