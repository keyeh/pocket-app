import React from "react"
import { ExpoConfigView } from "@expo/samples"
import { connect } from "react-redux"
import { View, Text } from "react-native"
import { Button } from "react-native-elements"
import { signOutUser } from "../actions"

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.navigationOptions = {
      title: "app.json"
    }

    this._handleSignOutButtonPress = this._handleSignOutButtonPress.bind(this)
  }

  _handleSignOutButtonPress() {
    this.props.signOutUser()
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>
          {/* {JSON.stringify(this.props.reduxTree)} */}
        </Text>
        <Button title={"Sign Out"} onPress={this._handleSignOutButtonPress} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ reduxTree: state })
const mapDispatchToProps = {
  signOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
