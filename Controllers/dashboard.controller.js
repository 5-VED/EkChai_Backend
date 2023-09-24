const Product = require('../Models/product.model')
const Bill = require('../Models/bill.model')
const Category = require('../Models/category.model')

const { StatusCodes } = require("http-status-codes")

/**
 * @param {*} req 
 * @param {*} res 
 * @returns Object containg count of documents of Product, Categories and Bills
 * @route http://localhost:3000/details
 * @method GET  
 */
exports.dashboardDetails = async (req, res) => {
    try {

        const products = await Product.countDocuments();
        const bills = await Bill.countDocuments();
        const categories = await Category.countDocuments();

        if (!products || products === null && !bills || bills === null && !categories || categories === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Error Fetching Data" })
        }

        const result = {
            products,
            bills,
            categories
        }

        return res.status(StatusCodes.OK).json({ message: "Data Fetched Successfuly", data: result })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
} 