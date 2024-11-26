import express from "express";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";
import { requireSignIn , isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Upadate Category
router.put("/update-category/:id" , requireSignIn , isAdmin , updateCategoryController)

//getAllCategory
router.get('/get-category',categoryController)

//get single Category
router.get('/single-category/:slug' , singleCategoryController)

//delete Category
router.delete('/delete-category/:id' , requireSignIn, isAdmin , deleteCategoryController)

export default router;