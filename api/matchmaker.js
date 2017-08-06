import geoFire from "../geoFire"
import Base from "../Base"
import _ from "lodash"

const findWorkersInRange = async fbUid => {
    const location = await geoFire.get(fbUid)
    console.log("location", location)
    const gQuery = geoFire.query({
        center: location,
        radius: 50
    })
    return new Promise(resolve => {
        const results = {}

        gQuery.on("key_entered", function(key, location, distance) {
            results[key] = distance
            console.log(key + " entered query at " + location + " (" + distance + " km from center)")
        })

        gQuery.on("ready", function() {
            console.log("GeoQuery has loaded and fired all other events for initial data")
            gQuery.cancel()
            resolve(results)
        })
    })
}

// unfiltered = {someuid: 123distance}
// const filterMaxDistance = async unfilteredWorkerGeoResults => {
//     const promises = Object.keys(unfilteredWorkerGeoResults).map(async k => {
//         const maxWorkDistance = await Base.fetch(`user/${k}/maxWorkDistance`, { context: this })
//         if (unfilteredWorkerGeoResults[k] < maxWorkDistance) {
//             return
//         }
//     })
//     return Promise.all(promises)
// }

const findWorkersWithJobType = jobType => {
    return Base.fetch(`workerJobTypes`, {
        context: this,
        queries: {
            orderByChild: jobType,
            equalTo: true
        }
    })
}

const matchMe = async (fbUid, jobType) => {
    const workersInRange = await findWorkersInRange(fbUid)
    const workersWithJobType = await findWorkersWithJobType(jobType)

    const commonKeys = _.intersection(_.keys(workersInRange), _.keys(workersWithJobType))

    const matchedWorkers = Object.assign(
        ...commonKeys.map(k => {
            if (k === fbUid) {
                return
            }
            return {
                [k]: { distance: workersInRange[k] }
            }
        })
    )

    const order = await Base.push("orders", {
        data: {
            requesterFbUid: fbUid,
            jobType,
            matchedWorkers,
            hasNotifiedWorkers: false,
            address: "123 Example Street, San Francisco, CA"
        }
    })

    return order.key
}

export default {
    matchMe
}
