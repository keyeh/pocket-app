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
import Base from "../../Base"

class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props)

    this._handlePhoneChange = this._handlePhoneChange.bind(this)
    this._handleSaveButtonPress = this._handleSaveButtonPress.bind(this)

    this.state = {
      formPhone: ""
    }
  }

  _handlePhoneChange(newPhone) {
    this.setState({ formPhone: newPhone })
  }

  _handleSaveButtonPress() {
    Base.update(`users/${this.props.fbUid}`, {
      data: { phone: this.state.formPhone }
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    const { formPhone } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>Onboarding</Text>
        <FormLabel>Phone</FormLabel>
        <FormInput onChangeText={this._handlePhoneChange} value={formPhone} />
        <Button
          icon={{ name: "envira", type: "font-awesome" }}
          title="Save"
          onPress={this._handleSaveButtonPress}
          style={styles.nextButton}
        />
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
  userPhone: state.user.phone,
  fbUid: state.auth.user.uid
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)
