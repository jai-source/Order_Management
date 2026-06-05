const {successResponse, errorResponse} = require("../utils/apiResponse")

const validate = (schema) => {

    return (req, res, next) => {

        const { error, value } =
            schema.validate(req.body);

        if (error) {
            return errorResponse(
                res,
                400,
                error.details[0].message
            )
        }

        req.body = value;

        next();
    };
};

module.exports = validate;