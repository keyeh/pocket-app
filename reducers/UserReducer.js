import {
  SUBSCRIBED_TO_USER,
  UNSUBSCRIBED_TO_USER,
  USER_DATA_UPDATED,
  SIGNED_OUT_USER
} from "../actions"

const initialState = {
  userListener: null,
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UNSUBSCRIBED_TO_USER:
    case SIGNED_OUT_USER:
      return initialState

    case SUBSCRIBED_TO_USER:
      return {
        ...state,
        userListener: action.payload
      }
    case USER_DATA_UPDATED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
