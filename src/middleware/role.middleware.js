const {successResponse, errorRespose} = require("../utils/apiResponse")

const authorizeRole = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return errorResponse(
                res,
                403,
                "Access Declined"
            )

        }

        next();

    };

};

module.exports = authorizeRole;