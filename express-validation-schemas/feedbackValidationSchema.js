const feedbackValidationSchema = {
  rating: {
    isFloat: true,
    notEmpty : {
      errorMessage: "Rating field must not be empty"
    }
  },
  comment: {
    isLenght: {
      options: {
        min: 5, max: 200
      },
      errorMessage: "Comment should be atleast 5 character with a max of 200 character"
     },
     notEmpty: {
      errorMessage: "Comment field cannot be empty"
     },
     isString: {
      errorMessage: "Comment must be a string"
     }
  }
};

module.exports = feedbackValidationSchema;