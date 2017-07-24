import {
  SUBSCRIBED_TO_USER,
  UNSUBSCRIBED_TO_USER,
  USER_DATA_UPDATED,
  SIGNED_OUT_USER
} from "../actions"

const initialState = {
  _userListener: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UNSUBSCRIBED_TO_USER:
    case SIGNED_OUT_USER:
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
