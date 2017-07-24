import Base from '../Base'

export const SUBSCRIBED_TO_USER = "SUBSCRIBED_TO_USER"
export const USER_DATA_UPDATED = "USER_DATA_UPDATED"

export const listenToUserData = (ctx, fbUid) => {
  return (dispatch, getState) => {
    const userListener = Base.listenTo(`users/${fbUid}`, {
      context: ctx,
      then: data => {
        dispatch({ type: USER_DATA_UPDATED, payload: data })
      }
    })

    dispatch({ type: SUBSCRIBED_TO_USER, payload: userListener })
  }
}
