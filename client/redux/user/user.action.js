import AuthService from "../../services/auth.service";
import { UserTypeActions } from "./user.type";

export const loginAction = (user) => ({
  type: UserTypeActions.LOGIN,
  payload: user,
});

export const login = (data, setError) => async (dispatch) => {
  try {
    const dataContext = await AuthService.login(data);
    const { accessToken, user } = dataContext;
    setError({ ok: false, msj: "" });
    dispatch(loginAction({ accessToken, user }));
  } catch (error) {
    setError({
      ok: true,
      msj: "Username or Password are wrong, please try it again.",
    });
    throw error;
  }
};

export const toggleSignIn = () => ({
  type: UserTypeActions.TOGGLE_SINGIN
});
