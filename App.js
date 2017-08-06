import React from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { Provider } from "react-redux"
import { connect } from "react-redux"
import Store from "./Store"
import Shell from "./Shell"

console.disableYellowBox = true

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <Shell />
            </Provider>
        )
    }
}
