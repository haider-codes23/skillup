const instructorValidationSchema = {
  bio: {
    isLenght: {
      options: {
        min: 5, max: 100
      },
      errorMessage: "instructor should be atleast 5 character with a max of 100 character"
     },
     notEmpty: {
      errorMessage: "instructor field cannot be empty"
     },
     isString: {
      errorMessage: "instructor must be a string"
     }
  },
  rating: {
    isFloat: true,
    notEmpty : {
      errorMessage: "Rating field must not be empty"
    }
  }
};

module.exports = instructorValidationSchema;