import React from 'react';
import { View, Text } from 'react-native';
import FormInput from '../components/forminput';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button, TextInput } from 'react-native-paper';
import { addNewUser } from '../redux/actions';
import { validator } from '../validation/formvalidate'


class CreateUserScreen extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			phoneNumber: '',
			phoneNumberError: '',
			username: '',
			usernameError: '',
			password: '',
			passwordError: '',
			isValid: true


		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'New User',
			headerStyle: {
				// workaround for lack of support for an overlay in react navigation
				backgroundColor: '#2b2b2b',
			},
			headerTuintColor: 'rgba(255,255,255, .60)',
			headerTitleStyle: {
				fontSize: 20,
				color: 'rgba(255,255,255, .60)',
			},
		}
	}



	checkValid = () => {
		if (
			validator({ username: this.state.username }, 'username') || validator({ password: this.state.password }, 'password') || validator({ phoneNumber: this.state.phoneNumber }, 'phoneNumber')) {
			this.setState({
				isValid: true
			})
		} else {
			this.setState({
				isValid: false
			})
		}
	}

	createUser = () => {
		this.props.addNewUser({
			phoneNumber: this.state.phoneNumber,
			username: this.state.username,
			password: this.state.password
		})
	}

	render() {

		return (
			<View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
				<TextInput
					mode="outlined"
					placeholder="Phone Number"
					style={{ ...TextStyles.H4, width: '90%' }}
					onChangeText={text => {
						this.setState({
							phoneNumber: text
						})
						this.checkValid()
					}}
					onBlur={() => {
						this.setState({
							phoneNumberError: validator({ phoneNumber: this.state.phoneNumber }, 'phoneNumber')
						})
					}}
				/>
				<Text style={{ color: '#CF6679' }}>{this.state.phoneNumberError}</Text>
				<TextInput
					mode="outlined"
					placeholder="Username"
					style={{ ...TextStyles.H4, width: '90%' }}
					onChangeText={text => {
						this.setState({
							username: text
						})
						this.checkValid()
					}}
					onBlur={() => {
						this.setState({
							usernameError: validator({ username: this.state.username }, 'username')
						})
					}}
				/>
				<Text style={{ color: '#CF6679' }}>{this.state.usernameError}</Text>
				<TextInput
					mode="outlined"
					placeholder="Password"
					style={{ ...TextStyles.H4, width: '90%' }}
					onChangeText={text => {
						this.setState({
							password: text
						})
						this.checkValid()
					}}
					onBlur={() => {
						this.setState({
							passwordError: validator({ password: this.state.password }, 'password')
						})
					}}
				/>
				<Text style={{ color: '#CF6679' }}>{this.state.passwordError}</Text>
				<Button
					mode="contained"
					style={{ ...SpacingStyles.settings }}
					onPress={this.createUser}
					disabled={this.state.isValid}
				>
					Create
							</Button>
			</View>
		)
	}

}



const mapDispatchToProps = {
	addNewUser
}
export default connect(null, mapDispatchToProps)(CreateUserScreen);