import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  posts: [],
};

const posts = {
  setSearches(state, action) {
    state.posts = action.payload;
  },
  savePost(state, action) {
    state.posts.push(action.payload);
  },
};

const reducer = produce((state, action) => {
  handler(state, action, posts);
}, initialState);

export default reducer;
