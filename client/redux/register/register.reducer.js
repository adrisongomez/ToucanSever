import {RegisterActionsType} from './register.types';

const InitialState = {
   firstName: "",
   lastName: "",
   country: "",
   state: "",
   email: "",
   city: "",
   zipCode: "",
   address: "",
   username: "",
   password: "",
   profileImg: "",
}

export const registerReducer = (state = InitialState, action) => {
   switch(action.type){
   case RegisterActionsType.INITIAL_REGISTER:
      return {
         ...state,
         firstName: action.payload.firstname,
         lastName: action.payload.lastName,
         email: action.payload.email,
         city: action.payload.city,
         country: action.payload.country,
         };
   default:
      return state;
   };
}
