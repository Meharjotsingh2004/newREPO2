import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product`
      );

      if (data.success) {
        console.log("Fetched products:", data.products); // Debugging output
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong while fetching products.");
    }
  };

  // Use effect to fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row container-fluid m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="row">
            
            {products && products.length > 0 ? (
              products.map((p) => (
                <div className="col-md-4 product-card" key={p._id}>
                  <Link to={`/dashboard/admin/product/${p.slug}`} className="text-decoration-none">
                    <div className="card m-3 product " style={{ width: "60%" }}>
                      <img
                        src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top product-img"
                        alt={p.name}
                        onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">{p.name}</h5>
                        <p className="card-text text-truncate">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center mt-4">
                <h5>No products found!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
