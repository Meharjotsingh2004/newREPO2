import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';
const router = express();


//routes
router.post('/create-product',requireSignIn, isAdmin,formidable(),createProductController)

//Update Product
router.put('/update-product/:pid',requireSignIn, isAdmin,formidable(),updateProductController)


//getAll-products
router.get('/get-product', getProductController)


//single Product 
router.get('/get-product/:slug' , getSingleProductController)


//get Photo Of Product
router.get('/product-photo/:pid',productPhotoController )

//delete Product
router.delete('/delete-product/:id', deleteProductController)

//filter Product
router.post('/product-fliters' , productFiltersController)

export default router; 