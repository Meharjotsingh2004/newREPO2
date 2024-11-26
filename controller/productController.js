import slugify from 'slugify';
import productModel from '../models/productModel.js'
import fs from 'fs'


export const createProductController = async(req,res)=>{

    try {    
     const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;

      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }

      const products = new productModel({...req.fields, slug: slugify(name) });

      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully(in createProductController)",
        products,
      });

    
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in crearing product",
        });
      }
}


//get all products 
export const getProductController=async(req,res)=>{
    try {
     const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})

         res.status(200).send({
          success: true,
          counTotal: products.length,
          message: "ALL Products (in getProductController)",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr in getting products(in getProductController)",
          error: error.message,
        });
      }

}


//get single Product with Slug

export const getSingleProductController=async(req ,res)=>{
    try {
        const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success:true,
            message:'Single Product is Fetched(in getSingleProductController)',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            messsage : "Error While Getting Single Product",
            error,
            success: false
        })
    }
}


//get Photot

export const productPhotoController = async(req,res)=>{
    try {
        
        const product = await productModel.findById(req.params.pid).select("photo")

        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(
              product.photo.data
            )
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"error in Getting Photo Of Product",
            success: "false",
            error
        })
    }
}


//delete Product

export const deleteProductController= async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success: true,
            message:"Product Deleted SuccessFully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message : "Error While Deleting Product (in deleteProductController)"
        })
    }
}


//updateProductController

export const updateProductController =async(req,res)=>{
    try {
        const { name, description, price, category, quantity, shipping } =
          req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        const products = await productModel.findByIdAndUpdate(
          req.params.pid,
          { ...req.fields, slug: slugify(name) },
          { new: true }
        );
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(200).send({
          success: true,
          message: "Product Updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Update product",
        });
      }
}


//filter Products
export const productFiltersController = async(req,res)=>{
  try {
    const {checked , radio} = req.body
    let args ={} 
    if(checked.length > 0) args.category  = checked
    if(radio.length) args.price = {$gt: radio[0],$lt:radio[1]}
    const products = await productModel.find(args)
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message : "Error in productFiltersController",
      error
    })
  }
}