import React from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { AppLoading, Asset, Font } from "expo"
import SignInScreen from "./screens/auth/SignInScreen"
import SignUpScreen from "./screens/auth/SignUpScreen"
import { Ionicons } from "@expo/vector-icons"
import RootNavigation from "./navigation/RootNavigation"
import Base from "./Base"
import { saveUserObject, listenToUserData } from "./actions"

class Shell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsAreLoaded: false,
      isAuthed: false
    }

    Base.initializedApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.saveUserObject(user)
        this.props.listenToUserData(this, user.uid)
        this.setState({ isAuthed: true })
      } else {
        this.setState({ isAuthed: false })
      }
    })
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return <AppLoading />
    }

    if (!this.state.isAuthed) {
      return <SignInScreen />
    }

    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    )
  }

  async _loadAssetsAsync() {
    try {
      await Promise.all([
        Asset.loadAsync([
          require("./assets/images/robot-dev.png"),
          require("./assets/images/robot-prod.png")
        ]),
        Font.loadAsync([
          // This is the font that we are using for our tab bar
          Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          { "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf") }
        ])
      ])
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        "There was an error caching assets (see: App.js), perhaps due to a " +
          "network timeout, so we skipped caching. Reload the app to try again."
      )
      console.log(e)
    } finally {
      this.setState({ assetsAreLoaded: true })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
})


const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})
const mapDispatchToProps = {
  saveUserObject, listenToUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell)
