import { Platform } from "react-native"
import { Permissions, Location, Constants } from "expo"
import geoFire from "../geoFire"

export default async fbUid => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === "granted") {
        if (Platform.OS === "android" && !Constants.isDevice) {
            return geoFire.set(fbUid, [37.422, -122.084])
        }

        const { coords } = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = coords
        return geoFire.set(fbUid, [latitude, longitude])
    } else {
        throw new Error("Location permission not granted")
    }
}
