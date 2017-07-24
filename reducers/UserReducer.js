import {
  SUBSCRIBED_TO_USER,
  USER_DATA_UPDATED,
  SIGNOUT_USER
} from "../actions"

const initialState = {
  _userListener: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT_USER:
      return initialState

    case SUBSCRIBED_TO_USER:
      return {
        _userListener: action.payload
      }
    case USER_DATA_UPDATED:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
