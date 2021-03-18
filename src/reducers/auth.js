import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  authData: null,
  user: JSON.parse(localStorage.getItem("profile")),
};

const auth = {
  auth(state, action) {
    localStorage.setItem("profile", JSON.stringify(action?.payload));
    state.authData = action?.data;
  },
  logout(state, action) {
    localStorage.clear();
    state.authData = null;
    state.user = null;
  },
};

const reducer = produce((state, action) => {
  handler(state, action, auth);
}, initialState);

export default reducer;
