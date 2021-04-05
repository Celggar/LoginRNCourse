import {SET_PROFILE} from './auth.types';

const initialState = {
  profile: null,
  isLogged: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      console.log('ejecuta el reducer', action);
      return {...state, profile: action.payload, isLogged: action.isLogged};
    default:
      return state;
  }
};

export default authReducer;
