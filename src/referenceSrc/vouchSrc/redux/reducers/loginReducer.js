import { validateLoginAction, toggleSecureEntryAction } from "../actions";
import {
  isValidEmail
} from '../../utils/validators';
import { VALIDATE_LOGIN, TOGGLE_SECURE_ENTRY } from "../actionTypes";

const initialState = {
  email: "mindgo.aman@gmail.com",
  isPasswordVisible: true,
  isEmailValid: true,
  isPasswordValid: false,
  isLoginDisabled: true
};


const checkIfValidPassword = password => {
  return password.trim().length > 1;
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_LOGIN:
      let { email, password } = action.payload;
      const returnable = {
        ...state,
        email: email,
        // password: password,
        isEmailValid: isValidEmail(email),
        isPasswordValid: checkIfValidPassword(password),
        isLoginDisabled:
          !isValidEmail(email) || !checkIfValidPassword(password)
      };
      return returnable;

    case TOGGLE_SECURE_ENTRY:
      return {
        ...state,
        isPasswordVisible: !state.isPasswordVisible
      };
    default:
      return state;
  }
};

export default LoginReducer;
