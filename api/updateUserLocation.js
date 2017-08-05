import { Permissions, Location } from "expo"
import geoFire from "../geoFire"

export default fbUid => {
    return Promise.all([Permissions.getAsync(Permissions.LOCATION), Location.getCurrentPositionAsync({})])
        .then(values => {
            const { coords, timestamp } = values[1]
            const { latitude, longitude } = coords

            return geoFire.set(fbUid, [latitude, longitude])
        })
        .catch(reason => {
            console.error("Failed to update user location:", reason)
        })
}
