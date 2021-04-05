import {SET_PROFILE} from './auth.types';

const setProfile = (profile, isLogged) => ({
  type: SET_PROFILE,
  payload: profile,
  isLogged,
});

export {setProfile};
