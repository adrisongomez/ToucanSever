import { UserTypeActions } from "./user.type";

const InitialState = {
  user: {},
  accessToken: "",
};

export const UserReducer = (state = InitialState, action) => {
  switch (action.type) {
    case UserTypeActions.LOGIN:
      return { ...action.payload };

    default:
      return state;
  }
};
