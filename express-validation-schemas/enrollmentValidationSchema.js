const enrollemntValidationSchema = {
  progress: {
    isInt: {
      min: 0,
      max: 100
    },
    errorMessage: "Number should between 0 and 100 inclusive"
  },
  is_complete: {
    isBoolean: {
      errorMessage: "is_complete should be a boolean value"
    }
  }
};

module.exports = enrollemntValidationSchema;