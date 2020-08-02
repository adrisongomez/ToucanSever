import { UserTypeActions } from "./user.type";

const InitialState = {
  user: {},
  accessToken: "",
  signIn: false
};

export const UserReducer = (state = InitialState, action) => {
  switch (action.type) {
    case UserTypeActions.LOGIN:
      return { ...action.payload };

    case UserTypeActions.TOGGLE_SINGIN:
      return { ...state, signIn: !state.signIn };

    default:
      return state;
  }
};
