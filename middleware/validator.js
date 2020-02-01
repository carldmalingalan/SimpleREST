const { body, buildCheckFunction } = require("express-validator");
// const checkBody = buildCheckFunction(["body"]);

module.exports = name => {
  switch (name) {
    case "CREATE_ITEM":
      return [
        body("name")
          .exists()
          .isString(),
        body("description")
          .exists()
          .isString(),
        body("quantity")
          .exists()
          .isNumeric()
      ];
    case "UPDATE_ITEM":
      return [
        body("id")
          .exists()
          .isMongoId(),
        body("name")
          .optional()
          .isString(),
        body("description")
          .optional()
          .isString(),
        body("quantity")
          .optional()
          .isNumeric()
      ];
    case "DELETE_ITEM":
      return [
        body("id")
          .exists()
          .isMongoId()
      ];
  }
};
