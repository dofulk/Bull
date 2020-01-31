import { validate } from 'validate.js';


export const validator = (value, fieldName) => {

  const formFields = {}

  formFields[fieldName] = constraints[fieldName]


  const result = validate(value, formFields)


  if (result) {

    return result[fieldName][0]

  }
   return null
}

const constraints = {
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: 'required'
    }
  },
  username: {
    presence: {
      allowEmpty: false,
      message: 'required'
    },
    length: {
      minimum: 3,
      message: 'must be at least 3 characters'
    }
  },

  password: {
    presence: {
      allowEmpty: false,
      message: 'required'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  }
}