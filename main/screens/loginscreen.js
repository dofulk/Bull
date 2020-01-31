import React from 'react';
import { View, Text } from 'react-native';
import FormInput from '../components/forminput';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button, TextInput } from 'react-native-paper';
import { addNewGroup } from '../redux/actions';
import { validator } from '../validation/formvalidate'


class CreateUserScreen extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			usernameError: '',
			password: '',
			passwordError: '',
			isValid: false

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
		if (validator({ username: this.state.username }, 'username') || validator({ password: this.state.password }, 'password')) {
			this.setState({
				isValid: false
			})
		} else {
			this.setState({
				isValid: true
			})
		}
	}

	createUser = () => {

	}

	render() {

		return (
			<View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
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
					onPress={() => console.log(this.state.usernameError)}
					disabled={!this.state.isValid}
				>
					Login
							</Button>
			</View>
		)
	}

}



const mapDispatchToProps = {
	addNewGroup
}
export default connect(null, mapDispatchToProps)(CreateUserScreen);