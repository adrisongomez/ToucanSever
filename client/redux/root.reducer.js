import {combineReducers} from 'redux';
import {registerReducer} from './register/register.reducer';

export default combineReducers({
   register: registerReducer,
});
