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
  unsavePost(state, action) {
    state.posts = state.posts.filter((item) => item.id != action.payload.id);
  },
};

const reducer = produce((state, action) => {
  handler(state, action, posts);
}, initialState);

export default reducer;
