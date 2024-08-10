import Category from '../database/models/category.js';
import Product from '../database/models/product.js'

export const getAllProducts = async(req, res)=>{
    try{
        const products = await Product.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            data: products
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error getting products',
            error: error.message 
        });
    }
}

export const getProductById = async(req, res) => {
    try{
        const {id} = req.params;
        const category = await Category.findByPk(id)
        if(!category){
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Product not found'
            })
        }
    }catch(error){
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error getting products',
            error: error.message 
        });
    }
}