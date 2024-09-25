const categoryValidationSchema = {
  name: {
    isLenght: {
      options: {
        min: 5, max: 20
      },
      errorMessage: "Name should be atleast 5 character with a max of 20 character"
     },
     notEmpty: {
      errorMessage: "Name field cannot be empty"
     },
     isString: {
      errorMessage: "name must be a string"
     }
  },
  descriptiom: {
    isLenght: {
      options: {
        min: 5, max: 100
      },
      errorMessage: "Description should be atleast 5 character with a max of 100 character"
     },
     notEmpty: {
      errorMessage: "Description field cannot be empty"
     },
     isString: {
      errorMessage: "Description must be a string"
     }
  }
};

module.exports = categoryValidationSchema;