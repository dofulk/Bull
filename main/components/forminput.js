import React from 'react'
import { TextInput } from 'react-native-paper'
import { View, Text } from 'react-native'
import { TextStyles, SpacingStyles } from '../styles/index'

const FormInput = props => (
    <TextInput
      mode="outlined"
      placeholder={props.placeholder}
      style={{ ...TextStyles.H4, width: '90%' }}
    />
    // {/* props.error ? <Text>{props.error}</Text> : null */}
)

export default FormInput
