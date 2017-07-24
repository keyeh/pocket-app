import Base from '../Base'

export const SUBSCRIBED_TO_USER = "SUBSCRIBED_TO_USER"
export const UNSUBSCRIBED_TO_USER = "UNSUBSCRIBED_TO_USER"
export const USER_DATA_UPDATED = "USER_DATA_UPDATED"

export const subscribeToUserData = (ctx, fbUid) => {
  return dispatch => {
    const userListener = Base.listenTo(`users/${fbUid}`, {
      context: ctx,
      then: data => {
        dispatch({ type: USER_DATA_UPDATED, payload: data })
      }
    })

    dispatch({ type: SUBSCRIBED_TO_USER, payload: userListener })
  }
}

export const unsubscribeToUserData = () => {
  return (dispatch, getState) => {
    const userListener = getState().user._userListener
    if (userListener) {
      Base.removeBinding(userListener)
      dispatch({type: UNSUBSCRIBED_TO_USER})
    }
  }
}
