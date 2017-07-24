import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements"
import { signUpUser } from "../../actions"

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)

    this._handleEmailChange = this._handleEmailChange.bind(this)
    this._handlePhoneChange = this._handlePhoneChange.bind(this)
    this._handlePasswordChange = this._handlePasswordChange.bind(this)
    this._handleNextButtonPress = this._handleNextButtonPress.bind(this)

    this.state = {
      formEmail: "",
      formPhone: "",
      formPassword: ""
    }
  }

  _handleEmailChange(newText) {
    this.setState({ formEmail: newText })
  }

  _handlePhoneChange(newText) {
    this.setState({ formPhone: newText })
  }

  _handlePasswordChange(newText) {
    this.setState({ formPassword: newText })
  }

  _maybeRenderPasswordValidationMessage() {
    if (this.state.formPassword.length === 0) {
      return null
    }

    if (this.state.formPassword.length > 6) {
      return null
    }

    return (
      <FormValidationMessage>
        {this.state.formPassword.length < 8 ? "Minimum 8 charachters" : ""}
      </FormValidationMessage>
    )
  }

  _handleNextButtonPress() {
    const { formEmail, formPassword } = this.state

    this.props.signUpUser(formEmail, formPassword)
  }

  render() {
    const { formEmail, formPhone, formPassword } = this.state
    const authErrorMsg = this.props.authError.message
    const authLoading = this.props.authLoading
    const passwordValidationMessage = this._maybeRenderPasswordValidationMessage()

    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>Sign up for awesomeness</Text>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={this._handleEmailChange} value={formEmail} />
        <FormLabel>Phone</FormLabel>
        <FormInput onChangeText={this._handlePhoneChange} value={formPhone} />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this._handlePasswordChange}
          secureTextEntry
          value={formPassword}
        />
        <FormLabel>Password Again</FormLabel>
        <FormInput
          onChangeText={this._handlePasswordChange}
          secureTextEntry
          value={formPassword}
        />
        {passwordValidationMessage}

        <Button
          title={authLoading ? "Loading" : "Sign Up"}
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
  signUpUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
