import {combineReducers} from 'redux';
import {registerReducer as RegisterReducer} from './register/register.reducer';
import {UserReducer} from './user/user.reducer';

export default combineReducers({
   register: RegisterReducer,
   user: UserReducer,
});
