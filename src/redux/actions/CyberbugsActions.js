import { USER_SIGNIN_API } from '../constants/CyberbugsConst';

export const signinCyberbugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
