const lessonValidationSchema = {
  title: {
    isLenght: {
      options: {
        min: 5, max: 20
      },
      errorMessage: "Title should be atleast 5 character with a max of 20 character"
     },
     notEmpty: {
      errorMessage: "Title field cannot be empty"
     },
     isString: {
      errorMessage: "Title must be a string"
     }
  },
  content: {
    isLenght: {
      options: {
        min: 5, max: 200
      },
      errorMessage: "Content should be atleast 5 character with a max of 100 character"
     },
     notEmpty: {
      errorMessage: "Content field cannot be empty"
     },
     isString: {
      errorMessage: "content must be a string"
     }
  },
  duration: {
    isInt: {
      errorMessage: "Duration must be a integer"
    },
    notEmpty: {
      errorMessage: "Duration field must not be empty"
    }
  },
  order: {
    isInt: {
      errorMessage: "Order must be a integer"
    },
    notEmpty: {
      errorMessage: "Order field must not be empty"
    }
  }
}