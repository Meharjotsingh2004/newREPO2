import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/prices";

const HomePage = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //Getting All Categories

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
        console.log(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Something Went Wrong in Getting Category(in HomePage.js)"
      );
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //getAllProducts
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product`
      );
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  if(!checked.length || !radio.length)  getAllProducts();
 
  }, [checked.length ,radio.length ]);

  useEffect(()=>{
    if(checked.length || radio.length)  filterProduct()
      // eslint-disable-next-line
  },[checked , radio])

  //filter by Catergories
  const handleFilter = (value , id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((c)=>c !== id)
    }
    setChecked(all)
  }

  //get Filtered Products
  const filterProduct = async () => {
    try {
      console.log('Sending filters:', { checked, radio }); // Log the filters being sent
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/product/product-fliters`,
        { checked, radio }
      );
      if (data?.products) {
        setProducts(data.products);
      } else {
        console.log('No products returned');
      }
    } catch (error) {
      console.error('Error filtering products:', error.message || error);
      toast.error("Something went wrong while filtering products.");
    }
  };
  
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-2 left-mg">
          <h4 className="text-center">Fliter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map(c=>(
            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked , c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          <h4 className="text-center mt-4">Fliter By Price</h4>
          <div className="d-flex flex-column">
         <Radio.Group onChange={e=>setRadio(e.target.value)}>
          {Prices?.map(p=>(
            <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
            </div>
          
          ))}
         </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-5">
            <button className="btn btn-danger" style={{width :"60%"}} onClick={()=>{
              window.location.reload()
            }}>RESET FILTERS</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All Products</h1>
          <div className="d-flex flex-group">
            {products?.length > 0 ? (
              products.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onError={(e) =>
                      (e.target.src = "http://example.com/default-image.jpg")
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>

                    <p className="card-text">{p.description.substring(0,30)}</p>
                    <p className="card-text">$ {p.price}</p>

                    <button className="btn btn-primary hmP-btn ">
                      View Details
                    </button>
                    <button className="btn btn-secondary ms-1 hmP-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="text-center w-100">No products available</h5>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
