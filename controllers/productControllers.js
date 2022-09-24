const Products = require("../models/productModel")

// Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObject = {...this.queryString} //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObject[el]))

        let queryStr = JSON.stringify(queryObject)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query= this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1 
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}


// Product CRUD
const productControllers = {
    getProducts: async(req, res) => {
        try {
            console.log(req.query)
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            
            const products = await features.query

            res.json({
                status: "success",
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) => {
        try {
            const {product_id, name, price, description, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg: "This product already exists"})

            const newProduct = new Products({
                product_id, 
                name: name.toLowerCase(),
                price,
                description,
                images,
                category
            })

            await newProduct.save()

            res.json({msg: "Product created"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Product deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) => {
        try {
            const {product_id, name, price, description, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Products.findByIdAndUpdate({_id: req.params.id}, {
                name: name.toLowerCase(), price, description, images, category
            })

            res.json({msg: "Updated product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productControllers;