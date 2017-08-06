import React from "react"
import { connect } from "react-redux"

import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FormLabel, FormInput, FormValidationMessage, Button, List, ListItem, CheckBox, Card } from "react-native-elements"
import { Permissions } from "expo"
import Base from "../Base"
import geoFire from "../geoFire"
import JobTypesTemplate from "../constants/JobTypesTemplate"
import updateUserLocation from "../api/updateUserLocation"
import matchmaker from "../api/matchmaker"

class ClientScreen extends React.Component {
    static navigationOptions = {
        title: "Client"
    }

    constructor(props) {
        super(props)

        this.state = {
            selectedJobType: null,
            orders: {}
        }

        this._handleExecuteButtonPress = this._handleExecuteButtonPress.bind(this)
    }

    componentWillMount() {
        Base.bindToState("orders", {
            context: this,
            state: "orders",
            queries: {
                orderByChild: "requesterFbUid",
                equalTo: this.props.fbUid
            }
        })
    }

    async _handleExecuteButtonPress() {
        await updateUserLocation(this.props.fbUid)
        const orderId = await matchmaker.matchMe(this.props.fbUid, this.state.selectedJobType)
        console.log(orderId)
    }

    _updateSelectedJobType(selectedJobType) {
        this.setState({ selectedJobType })
    }

    render() {
        const listItems = Object.keys(JobTypesTemplate).map(jobType => {
            return (
                <CheckBox
                    key={jobType}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title={jobType}
                    checked={this.state.selectedJobType === jobType}
                    onPress={this._updateSelectedJobType.bind(this, jobType)}
                />
            )
        })

        const orders = Object.keys(this.state.orders).map(orderId => {
            const order = this.state.orders[orderId]

            return (
                <Card key={orderId}>
                    <Text>
                        order: {orderId}
                    </Text>
                    <Text>
                        for: {order.jobType}
                    </Text>
                    <Text>
                        at: {order.address}
                    </Text>
                    <Text>
                        Your worker: {order.worker || "none assigned"}
                    </Text>
                </Card>
            )
        })

        return (
            <View style={styles.container}>
                <FormLabel>whatchu want fam?</FormLabel>
                {listItems}
                <Button title="Go" onPress={this._handleExecuteButtonPress} style={styles.nextButton} />

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {orders}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    fbUid: state.auth.user.uid
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ClientScreen)

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
