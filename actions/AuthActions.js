import Base from "../Base"

export const SIGNUP_USER_START = "SIGNUP_USER_START"
export const SIGNUP_USER_FAILED = "SIGNUP_USER_FAILED"

export const SIGNIN_USER_START = "SIGNIN_USER_START"
export const SIGNIN_USER_SUCCESS = "SIGNIN_USER_SUCCESS"
export const SIGNIN_USER_FAILED = "SIGNIN_USER_FAILED"
export const SIGNOUT_USER = "SIGNOUT_USER"

export const signUpUser = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER_START })
    Base.initializedApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({ type: SIGNUP_USER_FAILED, payload: error })
      })
  }
}

export const saveUserObject = user => {
  return { type: SIGNIN_USER_SUCCESS, payload: user }
}

export const signInUser = (email, password) => {
  return dispatch => {
    dispatch({ type: SIGNIN_USER_START })
    Base.initializedApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({ type: SIGNIN_USER_FAILED, payload: error })
      })
  }
}

export const signOutUser = () => {
  Base.initializedApp.auth().signOut()
  return { type: SIGNOUT_USER }
}
