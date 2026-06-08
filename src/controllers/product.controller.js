const prisma = require("../config/prisma");

const redisClient = require("../services/redis.client")

const {
    createProductSchema,
    updateProductSchema
} = require("../validation/product.validations");

const {
    successResponse,
    errorResponse
} = require("../utils/apiResponse");




const getAllProducts = async (req, res) => {

    try {

        const cachedProducts =
            await redisClient.get("products");

        if (cachedProducts) {

            return successResponse(
                res,
                200,
                "Products fetched from cache",
                JSON.parse(cachedProducts)
            );

        }

        const products =
            await prisma.product.findMany();

        await redisClient.set(
            "products",
            JSON.stringify(products),
            {
                EX: 300
            }
        );

        return successResponse(
            res,
            200,
            "Products fetched successfully",
            products
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to fetch products",
            error.message
        );

    }

};






const getProductById = async (req, res) => {

    try {

        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!product) {

            return errorResponse(
                res,
                404,
                "Product not found"
            );

        }

        return successResponse(
            res,
            200,
            "Product fetched successfully",
            product
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to fetch product",
            error.message
        );

    }

};






const createProduct = async (req, res) => {

    try {

        const {
            name,
            stock,
            price,
            description
        } = req.body;

        const product = await prisma.product.create({
            data: {
                SellerID: req.user.id,
                name,
                stock,
                price,
                description
            }
        });


        await redisClient.del("products");
        return successResponse(
            res,
            201,
            "Product created successfully",
            product
        );


    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to create product",
            error.message
        );

    }

};






const updateProduct = async (req, res) => {

    try {

        const id = Number(req.params.id);

        if (Object.keys(req.body).length === 0) {

            return errorResponse(
                res,
                400,
                "Please provide at least one field to update"
            );

        }

        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });

        if (!product) {

            return errorResponse(
                res,
                404,
                "Product not found"
            );

        }

        if (product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "You are not authorized to update this product"
            );

        }
        const updatedProduct =
            await prisma.product.update({

                where: {
                    id
                },

                data: req.body

            });
        await redisClient.del("products");
        await redisClient.del(`product:${id}`);
        return successResponse(
            res,
            200,
            "Product updated successfully",
            updatedProduct
        );
        

        

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to update product",
            error.message
        );

    }

};






const deleteProduct = async (req, res) => {

    try {

        const id = Number(req.params.id);


        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });

        if (!product) {

            return errorResponse(
                res,
                404,
                "Product not found"
            );

        }

        if (product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "You are not authorized to delete this product"
            );

        }
        const deleteProduct =
            await prisma.product.delete({

                where: {
                    id
                },
            });
        await redisClient.del("products");
        await redisClient.del(`product:${id}`);
        return successResponse(
            res,
            200,
            "Product deleted successfully",
        );



    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to delete product",
            error.message
        );

    }

};

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    deleteProduct
}