import React from 'react'
import { TextInput } from 'react-native-paper'
import { View } from 'react-native'
import { TextStyles, SpacingStyles } from '../styles/index'

const FormInput = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  ...rest
}) => (
  <View style={{width: '100%', alignSelf: 'center'}}>
    <TextInput
      {...rest}
      mode="outlined"
      name={name}
      value={value}
      placeholder={placeholder}
      style={{ ...TextStyles.H4, width: '90%' }}
							
							
							
    />
  </View>
)

export default FormInput
