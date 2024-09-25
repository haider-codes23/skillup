const courseValidationSchema = {
  title: {
    isLenght: {
      options: {
        min: 5,
        max: 20
      },
      errorMessage: "Title should be atleast 5 characters with a max of 20 characters"
    },
    notEmpty: {
      errorMessage: "Title should not be empty"
    },
    isString: {
      errorMessage: "Title should be a string"
    }
  },
  descriptiom: {
    isString: {
      errorMessage: "Description should be a string"
    }
  },
  category: {
    isString: {
      errorMessage: "category must be a string"
    }
  },
  price: {
    isDecimal: {
      errorMessage: "price should be a Decimal Number"
    }
  }
};

module.exports = courseValidationSchema;