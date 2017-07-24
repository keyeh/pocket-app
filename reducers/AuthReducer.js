import {
  SIGN_UP_USER_START,
  SIGN_UP_USER_FAILED,
  SIGN_IN_USER_START,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILED,
  SIGNED_OUT_USER
} from "../actions"

const initialState = {
  user: null, // eventually will use this to store other user attributes too
  error: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_OUT_USER:
      return initialState

    case SIGN_UP_USER_START:
    case SIGN_IN_USER_START:
      return {
        ...state,
        loading: true,
        error: {}
      }
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: {},
        loading: false
      }

    case SIGN_UP_USER_FAILED:
    case SIGN_IN_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}
