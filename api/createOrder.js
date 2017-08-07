import Base from "../Base"
import firebase from "firebase"

const createOrder = async (fbUid, jobType) => {
    const order = await Base.push("orders", {
        data: {
            requesterFbUid: fbUid,
            jobType,
            hasNotifiedWorkers: false,
            address: "123 Example Street, San Francisco, CA",
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            matchingEndsOffsetMs: 1 * 60 * 1000
        }
    })

    return order.key
}

export default createOrder
