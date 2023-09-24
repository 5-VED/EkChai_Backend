db.products.aggregate([{
    "$lookup": {
        "from": "categories",
        "localField": "categoryId",
        "foreignField": "_id",
        "as": "products"
    },
},
{ "$unwind": "$products" },
{
    "$project": {
        "_id": "$_id",
        "name": "$name",
        "description": "$description",
        "price": "$price",
        "status": "$status",
        "categoryId": "$categoryId",
        "categoryName": "$products.name"
    }
}
])