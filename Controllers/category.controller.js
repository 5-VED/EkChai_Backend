const Category = require('../Models/category.model');
const { StatusCodes } = require('http-status-codes')


/** 
 * @action API to add new Category
 * @method POST
 * @route http://localhost:3000/add
 **/
exports.addCategory = async (req, res) => {
    try {
        const result = await new Category({
            name: req.body.name
        });

        if (result) {
            await result.save();
            return res.status(StatusCodes.OK).json({
                data: result, message: "Category Added Successfully"
            });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please Insert valid value" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

/**
 * @action API to get all Categories
 * @method GET
 * @route http://localhost:3000/get
 **/
exports.getCategories = async (req, res) => {
    try {
        const result = await Category.find();
        if (result) {
            return res.status(StatusCodes.OK).json({
                data: result, message: "Categories Fetched Successfully"
            })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Something went wrong, Please try again later"
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

/**
 * @action API to update Category
 * @method PUT
 * @route http://localhost:3000/update/:id
 */
exports.updateCategories = async (req, res) => {
    try {
        const result = await Category.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name
            }
        })
        if (result) {
            return res.status(StatusCodes.OK).json({
                message: "Category updated successfully"
            })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Something went wrong please try again later"
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }

}
