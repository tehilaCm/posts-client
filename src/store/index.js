import { createStore, combineReducers } from "redux";

import auth from "../reducers/auth";
import posts from "../reducers/posts";
import searches from "../reducers/searches";
import userPosts from "../reducers/userPosts";

const reducer = combineReducers({ auth, posts, searches, userPosts });

const store = createStore(reducer);
window.store = store;
export default store;
