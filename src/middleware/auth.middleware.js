const jwt = require("jsonwebtoken");
const {successResponse, errorResponse} = require("../utils/apiResponse")

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return errorResponse(
            res,
            401,
            "Invalid Token"
        )
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return errorResponse(
            res,
            401,
            "Invalid authorization format"
        )
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }
    catch(error){

    console.error(error);

    return errorResponse(
        res,
        401,
        "Invalid token",
        process.env.NODE_ENV === "development"
            ? error.message
            : null
    );

}
};

module.exports = verifyToken;
