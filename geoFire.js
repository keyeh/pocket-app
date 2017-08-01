import GeoFire from "geofire"
import Base from "./Base"

const geoFire = new GeoFire(Base.initializedApp.database().ref("userLocations"))

export default geoFire
