// import React, { useEffect, useState } from 'react'
// import Layout from '../components/Layout/Layout'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const CategoryProduct = () => {

//     const [product,setProduct] = useState([]);
//     const [category,setCategory] = useState([]);
//     const params = useParams();

//     const getProductByCategory = async()=>{
//         try {
//             const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
//             setProduct(data?.products);
//             setCategory(data?.category);

//         } catch (error) {
//             console.log("Error in getProductByCategory", error);

//         }
//     }

//     useEffect(()=>{
//         if(params?.slug) getProductByCategory();
//     },[])


//   return (
//     <Layout>

//         <div className="container">
//             <h1 className='text-center'> Category - {category?.name }</h1>
//             <h1 className='text-center'>{product.length} Result found</h1>




//         </div>

//     </Layout>
//   )
// }

// export default CategoryProduct







import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={350}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    {/* <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p> */}
                    <p className="card-text"> $ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;






