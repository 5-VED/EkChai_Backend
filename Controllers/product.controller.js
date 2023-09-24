const { StatusCodes } = require('http-status-codes');
const Product = require('../Models/product.model');
const ObjectID = require('mongodb').ObjectId;

/**
* API to add new product
*/
exports.addProduct = async (req, res) => {
    try {
        const result = await new Product({
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description,
            price: req.body.price
        })
        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Something went wrong,Please try again later"
            });
        }
        result.save();
        return res.status(StatusCodes.OK).json({
            data: result, message: "Product added successfully"
        });
    } catch (error) {
        console.log(error)
    }
}

/** 
* API to get list of products
*/
exports.getProducts = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            { $unwind: '$products' },
            {
                $project: {
                    _id: "$_id",
                    name: "$name",
                    description: "$description",
                    price: "$price",
                    status: "$status",
                    categoryId: "$categoryId",
                    categoryName: "$products.name"
                }
            }
        ])
        if (result.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Products does not exist"
            })
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Products data fetched successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

/** 
* API to get product by id
*/
exports.getProductById = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id })
        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Product does not exist"
            })
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Product fetched successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

/**
* API to delete product
*/
exports.deleteProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id })
        if (result.deletedCount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Product does not exist"
            })
        }
        return res.status(StatusCodes.OK).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * API to get Product by Category id 
 */


exports.getProductByCategoryId = async (req, res) => {
    try {
        const result = await Product.aggregate(
            [
                {
                    "$match": {
                        categoryId: new ObjectID(req.params.id),
                    }
                },
                {
                    "$project": {
                        "_id": "$_id",
                        // "id":{"$toString":"$_id"},
                        "name": "$name"
                    }
                }
            ]
        )

        if (result.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No Products Found" });
        }
        return res.status(StatusCodes.OK).json({ data: result, message: "Products details fetched successfully" });

    } catch (error) {
        console.log(error)
    }
}


/**
 * API to Update Product by Category id 
 */
exports.updateProduct = async (req, res) => {
    try {
        const result = await Product.updateOne({
            _id: req.body.id,
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description,
            price: req.body.price
        })
        if (result.matchedCount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Products does not exist" });
        }
        return res.status(StatusCodes.OK).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
    }
}

/**
 * API to Update Status of the Product
 */
exports.updateStatus = async (req, res) => {
    try {
        const result = await Product.updateOne({
            _id: req.body.id,
            status: req.body.status
        })
        if (result.modifiedCount === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product does not exist" })
        }
        return res.status(StatusCodes.OK).json({ message: "Product status updated successfully" })

    } catch (error) {
        console.log(error)
    }
}