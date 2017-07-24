import {
  SIGNUP_USER_START,
  SIGNUP_USER_FAILED,
  SIGNIN_USER_START,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  SIGNOUT_USER
} from "../actions"

const initialState = {
  user: null, // eventually will use this to store other user attributes too
  error: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT_USER:
      return initialState

    case SIGNUP_USER_START:
    case SIGNIN_USER_START:
      return {
        ...state,
        loading: true,
        error: {}
      }
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: {},
        loading: false
      }

    case SIGNUP_USER_FAILED:
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}
