import Base from "../Base"

export const SIGN_UP_USER_START = "SIGN_UP_USER_START"
export const SIGN_UP_USER_FAILED = "SIGN_UP_USER_FAILED"

export const SIGN_IN_USER_START = "SIGN_IN_USER_START"
export const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS"
export const SIGN_IN_USER_FAILED = "SIGN_IN_USER_FAILED"
export const SIGNED_OUT_USER = "SIGNED_OUT_USER"

export const signUpUser = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_USER_START })
    Base.initializedApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({ type: SIGN_UP_USER_FAILED, payload: error })
      })
  }
}

export const saveUserObject = user => {
  return { type: SIGN_IN_USER_SUCCESS, payload: user }
}

export const signInUser = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGN_IN_USER_START })
    Base.initializedApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({ type: SIGN_IN_USER_FAILED, payload: error })
      })
  }
}

export const signedOutUser = () => {
  return { type: SIGNED_OUT_USER }
}
