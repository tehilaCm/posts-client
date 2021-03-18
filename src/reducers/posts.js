import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  posts: [],
};

const posts = {
  setPosts(state, action) {
    state.posts = action.payload;
  },
};

const reducer = produce((state, action) => {
  handler(state, action, posts);
}, initialState);

export default reducer;
