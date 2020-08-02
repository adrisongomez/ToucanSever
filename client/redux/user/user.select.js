import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectSignIn = createSelector([selectUser], user => user.signIn);
