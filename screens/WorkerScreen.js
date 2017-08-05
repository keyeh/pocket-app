import React from "react"
import { connect } from "react-redux"

import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FormLabel, FormInput, FormValidationMessage, Button, List, ListItem, CheckBox } from "react-native-elements"
import Base from "../Base"
import geoFire from "../geoFire"
import JobTypesTemplate from "../constants/JobTypesTemplate"
import updateUserLocation from "../api/updateUserLocation"

class WorkerScreen extends React.Component {
    static navigationOptions = {
        title: "Worker"
    }

    constructor(props) {
        super(props)

        this.state = {
            formMaxWorkDistance: props.userMaxWorkDistance,
            jobTypes: {}
        }

        this._handleMaxWorkDistanceChange = this._handleMaxWorkDistanceChange.bind(this)
        this._handleLocationButtonPress = this._handleLocationButtonPress.bind(this)
        this._handleSaveButtonPress = this._handleSaveButtonPress.bind(this)
    }

    // static defaultJobTypes =

    componentWillMount() {
        Base.syncState(`workerJobTypes/${this.props.fbUid}`, {
            context: this,
            state: "jobTypes",
            defaultValue: JobTypesTemplate
        })
    }

    _handleLocationButtonPress() {
        updateUserLocation(this.props.fbUid)
    }

    _handleMaxWorkDistanceChange(newValue) {
        this.setState({ formMaxWorkDistance: newValue })
    }

    _handleSaveButtonPress() {
        Base.update(`users/${this.props.fbUid}`, {
            data: { maxWorkDistance: this.state.formMaxWorkDistance }
        }).catch(err => {
            console.error(err)
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
        const { formMaxWorkDistance } = this.state

        const listItems = Object.keys(JobTypesTemplate).map(jobType => {
            return <CheckBox key={jobType} title={jobType} checked={this.state.jobTypes[jobType]} onPress={this._toggleJobType.bind(this, jobType)} />
        })

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <FormLabel>Max distance</FormLabel>
                    <FormInput onChangeText={this._handleMaxWorkDistanceChange} value={formMaxWorkDistance} />
                    <Button title="Save" onPress={this._handleSaveButtonPress} style={styles.nextButton} />

                    {listItems}
                    <Button title="location" onPress={this._handleLocationButtonPress} style={styles.nextButton} />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userMaxWorkDistance: state.user.data.maxWorkDistance,
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
