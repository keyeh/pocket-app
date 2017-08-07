import React from "react"
import { connect } from "react-redux"
import prettyMs from "pretty-ms"
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import _ from "lodash"
import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button,
    List,
    ListItem,
    CheckBox,
    Card
} from "react-native-elements"
import Base from "../Base"
import JobTypesTemplate from "../constants/JobTypesTemplate"
import updateUserLocation from "../api/updateUserLocation"
import ProgressBar from "react-native-progress/Bar"
class WorkerScreen extends React.Component {
    static navigationOptions = {
        title: "Worker"
    }

    constructor(props) {
        super(props)

        this.state = {
            timestamp: Date.now(),
            jobTypes: {},
            availableJobs: {},
            acceptedJobs: {}
        }

        this._handleLocationButtonPress = this._handleLocationButtonPress.bind(this)
        this._updateDateNowState = this._updateDateNowState.bind(this)
    }

    // static defaultJobTypes =

    componentWillMount() {
        const { fbUid } = this.props

        this.ticker = setInterval(this._updateDateNowState, 750)

        Base.syncState(`users/${fbUid}/jobTypes`, {
            context: this,
            state: "jobTypes",
            defaultValue: JobTypesTemplate
        })

        Base.syncState(`users/${fbUid}/availableJobsAsWorker`, {
            context: this,
            state: "availableJobs",
            defaultValue: {},
            queries: {
                orderByChild: `matchingEndsAt`,
                // startAt: Date.now() - 1 * 60 * 1000
                startAt: 0
            }
        })

        Base.syncState(`orders`, {
            context: this,
            state: "acceptedJobs",
            defaultValue: {},
            queries: {
                orderByChild: "worker",
                equalTo: fbUid
            }
        })
    }

    componentWillUnmount() {
        clearTimeout(this.ticker)
    }

    _updateDateNowState() {
        console.log("update")
        this.setState({ timestamp: Math.round(Date.now() / 1000) * 1000 })
    }

    _handleLocationButtonPress() {
        updateUserLocation(this.props.fbUid)
    }

    _handleAcceptOrder(orderId) {
        this._handleDeclineOrder(orderId)
        Base.update(`orders/${orderId}`, {
            data: {
                worker: this.props.fbUid
            }
        })
    }

    _handleDeclineOrder(orderId) {
        const { availableJobs, fbUid } = this.state
        console.log({ availableJobs: _.omit(availableJobs, orderId) })
        this.setState({
            availableJobs: { ...availableJobs, [orderId]: null }
        })

        Base.update(`orders/${orderId}/worker`, {
            data: {
                worker: this.props.fbUid,
                [`availableWorkers/${fbUid}`]: false
            }
        })
    }

    _toggleJobType(jobType, event) {
        this.setState({
            jobTypes: {
                ...JobTypesTemplate,
                ...this.state.jobTypes,
                [jobType]: !this.state.jobTypes[jobType]
            }
        })
    }

    render() {
        const { jobTypes, availableJobs, acceptedJobs, timestamp } = this.state
        const { fbUid } = this.props

        const listItems = Object.keys(JobTypesTemplate).map(jobType => {
            return (
                <CheckBox
                    key={jobType}
                    title={jobType}
                    checked={this.state.jobTypes[jobType]}
                    onPress={this._toggleJobType.bind(this, jobType)}
                />
            )
        })

        const availableJobsCards = Object.keys(availableJobs).map(k => {
            console.log("availableJobsCards")
            const job = availableJobs[k]
            const distance = job.distance
            const timeLeft = job.matchingEndsAt - timestamp

            if (jobTypes[job.jobType] && timeLeft >= 0) {
                return (
                    <Card key={k}>
                        <Text>
                            {job.jobType}
                        </Text>
                        <Text>
                            {distance} miles from you
                        </Text>
                        <Text>
                            {prettyMs(timeLeft, { secDecimalDigits: 0, verbose: true })} remaining
                            to accept
                        </Text>
                        <ProgressBar progress={timeLeft / (1 * 60 * 1000)} width={200} />
                        <Button title="accept" onPress={this._handleAcceptOrder.bind(this, k)} />
                        <Button title="decline" onPress={this._handleDeclineOrder.bind(this, k)} />
                    </Card>
                )
            }
            return (
                <Card key={k}>
                    <Text>
                        Missed {job.jobType} {distance} miles from you!
                    </Text>
                </Card>
            )
        })

        const acceptedJobsCards = Object.keys(acceptedJobs).map(k => {
            console.log("acceptedJobsCards")
            const order = acceptedJobs[k]
            return (
                <Card key={k} style={{ backgroundColor: "lime" }}>
                    <Text>
                        doing {order.jobType}
                    </Text>
                    <Text>
                        Address: {order.address}
                    </Text>
                </Card>
            )
        })

        return (
            <View style={styles.container}>
                <Text>I am willing to do:</Text>

                {listItems}
                <Button
                    title="location"
                    onPress={this._handleLocationButtonPress}
                    style={styles.nextButton}
                />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    {availableJobsCards}
                    {acceptedJobsCards}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    fbUid: state.auth.user.uid
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    }
})
