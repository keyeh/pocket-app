import Base from "../Base"
import { Permissions, Notifications } from "expo"

export default (async function registerForPushNotificationsAsync() {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
        console.error("User did not grant push permission")
        return
    }

    // Get the token that uniquely identifies this device
    const pushToken = await Notifications.getExpoPushTokenAsync()

    const { uid } = Base.initializedApp.auth().currentUser
    console.log(uid)
    // POST the token to our backend so we can use it to send pushes from there
    return Base.update(`users/${uid}`, {
        data: { pushToken }
    })
})
