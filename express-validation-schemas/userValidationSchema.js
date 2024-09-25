const userValidationScehma = {
  name: {
     isLenght: {
      options: {
        min: 3, max: 20
      },
      errorMessage: "Name should be atleast 3 character with a max of 20 character"
     },
     notEmpty: {
      errorMessage: "Name field cannot be empty"
     },
     isString: {
      errorMessage: "name must be a string"
     }
  },
  email: {
    isEmail: {
      errorMessage: "Must be a valid Email"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "password field must not be empty"
    }
  },
  role: {
    notEmpty: {
      errorMessage: "Role field must not be empty"
    }
  }
};

module.exports = userValidationScehma;