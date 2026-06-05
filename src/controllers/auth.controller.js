const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {successResopnse, errorResponse} = require("../utils/apiResponse")

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return errorResponse(
        res,
        400,
        "User Already Exists"
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    successResopnse(
      res,
      201,
      "User Registered Succesfully"
    )
  }
  catch(error){

    console.error(error);

    return errorResponse(
        res,
        500,
        "Internal server error",
        process.env.NODE_ENV === "development"
            ? error.message
            : null
    );

}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return errorResponse(
        res,
        404,
        "User Not Found"
      )
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return errorResponse(
        res,
        401,
        "Invalid Credentials"
      )
    }
    const token = jwt.sign({id: user.id, role: user.role} , process.env.JWT_SECRET, {expiresIn: "1d"});
    return successResopnse(
      res,
      200,
      "Login successful",
      { token }
    )

  } 
  catch(error){

    console.error(error);

    return errorResponse(
        res,
        500,
        "Internal server error",
        process.env.NODE_ENV === "development"
            ? error.message
            : null
    );

}
};

const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        CreatedAt: true,
      },
    });

    if (!user) {
      return errorResponse(
        res,
        404,
        "User Not Found"
      )
    }

    return successResopnse(
      res,
      200,
      "User Data Retreived Succesfully",
      { user }
    )
  } 
  catch(error){

    console.error(error);

    return errorResponse(
        res,
        500,
        "Internal server error",
        process.env.NODE_ENV === "development"
            ? error.message
            : null
    );

}
};


module.exports = {
  register,
  login,
  profile,
};
