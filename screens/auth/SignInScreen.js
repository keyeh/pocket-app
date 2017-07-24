import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements"
import { signInUser } from "../../actions"

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)

    this._handleEmailChange = this._handleEmailChange.bind(this)
    this._handlePasswordChange = this._handlePasswordChange.bind(this)
    this._handleNextButtonPress = this._handleNextButtonPress.bind(this)

    this.state = {
      formEmail: "",
      formPassword: ""
    }
  }

  _handleEmailChange(newText) {
    this.setState({ formEmail: newText })
  }

  _handlePasswordChange(newText) {
    this.setState({ formPassword: newText })
  }

  _handleNextButtonPress() {
    const { formEmail, formPassword } = this.state

    this.props.signInUser(formEmail, formPassword)
  }

  render() {
    const { formEmail, formPassword } = this.state
    const authErrorMsg = this.props.authError.message
    const authLoading = this.props.authLoading

    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>Sign up for awesomeness</Text>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={this._handleEmailChange} value={formEmail} />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this._handlePasswordChange}
          secureTextEntry
          value={formPassword}
        />
        <Button
          title={authLoading ? "Loading" : "Sign In"}
          onPress={this._handleNextButtonPress}
          style={styles.nextButton}
        />
        <Text style={styles.firebaseAuthErrorText}>
          {authErrorMsg}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  nextButton: {
    paddingTop: 30
  },
  firebaseAuthErrorText: {
    color: "red",
    textAlign: "center"
  }
})

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  authError: state.auth.error
})
const mapDispatchToProps = {
  signInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
