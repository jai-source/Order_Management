const prisma = require("../config/prisma");

const {
    successResponse,
    errorResponse
} = require("../utils/apiResponse");



const createOrder = async (req, res) => {

    try {

        const {
            ProductID,
            quantity
        } = req.body;

        const product = await prisma.product.findUnique({
            where: {
                id: ProductID
            }
        });

        if (!product) {

            return errorResponse(
                res,
                404,
                "Product not found"
            );

        }

        if (product.stock < quantity) {

            return errorResponse(
                res,
                400,
                "Insufficient stock"
            );

        }

        const TotalPrice =
            product.price * quantity;

        await prisma.$transaction(async(tx) => {
            const order = await tx.order.create({

                data: {
                    BuyerID: req.user.id,
                    ProductID,
                    quantity,
                    TotalPrice
                }

            });

        await tx.product.update({

            where: {
                id: ProductID
            },

            data: {
                stock: product.stock - quantity
            }

        });
        })

        return successResponse(
            res,
            201,
            "Order created successfully",
            order
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to create order",
            error.message
        );

    }

};









const getOrders = async (req, res) => {

    try {

        const orders = await prisma.order.findMany({
            where: {
                BuyerID: req.user.id
            },
            include: {
                product: true
            }
        });

        return successResponse(
            res,
            200,
            "Orders fetched successfully",
            orders
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to fetch orders",
            error.message
        );

    }

};






const cancelOrder = async(req, res) => {
    try{
        const order = await prisma.order.findUnique({
    where: {
        id: Number(req.params.id)
    },
    include: {
        product: true
    }
});

if (!order) {

    return errorResponse(
        res,
        404,
        "Order not found"
    );

}

if (order.BuyerID !== req.user.id) {

    return errorResponse(
        res,
        403,
        "Access denied"
    );

}

if (order.status !== "created") {

    return errorResponse(
        res,
        400,
        "Only created orders can be cancelled"
    );

}
await prisma.order.update({
    where: {
        id: order.id
    },
    data: {
        status: "cancelled"
    }
});



await prisma.product.update({
    where: {
        id: order.ProductID
    },
    data: {
        stock: order.product.stock + order.quantity
    }
});


const updatedOrder = await prisma.order.update({
    where: {
        id: order.id
    },
    data: {
        status: "cancelled"
    }
});

return successResponse(
    res,
    200,
    "Order cancelled successfully",
    updatedOrder
);
    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to cancel order",
            error.message
        );

    }
};





const acceptOrder = async (req, res) => {

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                product: true
            }
        });

        if (!order) {

            return errorResponse(
                res,
                404,
                "Order not found"
            );

        }

        if (order.product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "Access denied"
            );

        }

        if (order.status !== "created") {

            return errorResponse(
                res,
                400,
                "Only created orders can be accepted"
            );

        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "accepted"
            }
        });

        return successResponse(
            res,
            200,
            "Order accepted successfully",
            updatedOrder
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to accept order",
            error.message
        );

    }

};





const rejectOrder = async (req, res) => {

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                product: true
            }
        });

        if (!order) {

            return errorResponse(
                res,
                404,
                "Order not found"
            );

        }

        if (order.product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "Access denied"
            );

        }

        if (order.status !== "created") {

            return errorResponse(
                res,
                400,
                "Only created orders can be rejected"
            );

        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "rejected"
            }
        });

        await prisma.product.update({
            where: {
                id: order.ProductID
            },
            data: {
                stock: order.product.stock + order.quantity
            }
        });

        return successResponse(
            res,
            200,
            "Order rejected successfully",
            updatedOrder
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to reject order",
            error.message
        );

    }

};





const shipOrder = async (req, res) => {

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                product: true
            }
        });

        if (!order) {

            return errorResponse(
                res,
                404,
                "Order not found"
            );

        }

        if (order.product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "Access denied"
            );

        }

        if (order.status !== "accepted") {

            return errorResponse(
                res,
                400,
                "Only accepted orders can be shipped"
            );

        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "shipped"
            }
        });

        return successResponse(
            res,
            200,
            "Order shipped successfully",
            updatedOrder
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to ship order",
            error.message
        );

    }

};





const deliverOrder = async (req, res) => {

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                product: true
            }
        });

        if (!order) {

            return errorResponse(
                res,
                404,
                "Order not found"
            );

        }

        if (order.product.SellerID !== req.user.id) {

            return errorResponse(
                res,
                403,
                "Access denied"
            );

        }

        if (order.status !== "shipped") {

            return errorResponse(
                res,
                400,
                "Only shipped orders can be delivered"
            );

        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "delivered"
            }
        });

        return successResponse(
            res,
            200,
            "Order delivered successfully",
            updatedOrder
        );

    } catch (error) {

        return errorResponse(
            res,
            500,
            "Failed to deliver order",
            error.message
        );

    }

};

module.exports = {
    createOrder,
    getOrders,
    cancelOrder,
    acceptOrder,
    rejectOrder,
    shipOrder,
    deliverOrder
};