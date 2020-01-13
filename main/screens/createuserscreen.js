import React from 'react';
import { View, Text } from 'react-native';
import FormInput from '../components/forminput';
import { SpacingStyles, TextStyles } from '../styles/index';
import { connect } from 'react-redux';
import { Avatar, Surface, Paragraph, Button, TextInput } from 'react-native-paper';
import { addNewGroup } from '../redux/actions';
import { Formik } from 'formik'
import * as Yup from 'yup'


class CreateUserScreen extends React.Component {


	static navigationOptions = ({ navigation }) => {
		return {
			title: 'New User',
			headerStyle: {
				// workaround for lack of support for an overlay
				backgroundColor: '#2b2b2b',
			},
			headerTuintColor: 'rgba(255,255,255, .60)',
			headerTitleStyle: {
				fontSize: 20,
				color: 'rgba(255,255,255, .60)',
			},
		}
	}


	createUser = user => {
		if (user.username == '' || user.password == '') {
			alert('Please provide username and password')
		} else {
			console.log(user)
			this.props.navigation.goBack()
		}

	}

	render() {

		return (
			<Formik
				initialValues={{
					username: '',
					password: '',
					bio: '',
				}}
				validationSchema={validationSchema}
				onSubmit={values => this.createUser(values)}
			>
				{({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
					<View style={{ ...SpacingStyles.container, alignItems: 'center' }}>
						<FormInput
							name="username"
							value={values.username}
							placeholder="Username"
							onChangeText={handleChange('username')}
							required={true}
						/>
						<Text style={{ color: '#CF6679' }}>{errors.username}</Text>

						<FormInput
							name="password"
							value={values.password}
							placeholder="Password"
							onChangeText={handleChange('password')}
							required={true}
						/>
						<Text style={{ color: '#CF6679' }}>{errors.password}</Text>
						<Button
							mode="contained"
							style={{ ...SpacingStyles.settings }}
							onPress={handleSubmit}
							disabled={!isValid}>
							Create
							</Button>
					</View>
				)}
			</Formik>
		)
	}

}


const validationSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	password: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Password Required'),
});


const mapDispatchToProps = {
	addNewGroup
}
export default connect(null, mapDispatchToProps)(CreateUserScreen);