import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);


    const getProduct = async () => {
        try {
            //controller of get Single Product
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            //similar product ki bhi initial time pe call kar lena hai
            getSimilarProduct(data?.product._id , data?.product.category._id);


        } catch (error) {
            console.log("Error in ProductDetails", error);

        }
    }

    //getSimilar product____________________________________________________________________________

    const getSimilarProduct = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`
            )
             
            setRelatedProduct(data?.products)
           
            
        } catch (error) {
            
        }

    }


    useEffect(() => {
        if (params?.slug) getProduct()
       

    }, [params?.slug])

    return (
        <Layout>

            
            <div className="row container mt-1">
                <div className="col-md-6"> <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product?.name}
                    height={300}
                    style={{ objectFit: 'cover' }}
                /></div>
                <div className="col-md-6">
                    
                    <h1 className='text-center'>Product Details</h1>
                    <h4>Name : {product?.name}</h4>
                    <h4>Description : {product.description}</h4>
                    <h4>Price : {product.price}</h4>
                    <h4>Category : {product.category?.name}</h4>

                    <button className='btn btn-secondary ms-1'>Add to Cart</button>
                    
                </div>
            </div>
            <hr />

            <div className="row container">
               <h3>Similar Products</h3>
               {relatedProduct.length<1 &&  <p className='text-center'>No Similar Products Found</p>}
             {/* {JSON.stringify(relatedProduct,null,4)} */}
             <div className="d-flex flex-wrap">
            {relatedProduct.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p?.name}
                  height={350}
                  style={{ objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  
                  <button className='btn btn-secondary ms-1'>Add to Cart</button>

                </div>
              </div>


            ))}
          </div>
            </div>

        </Layout>
    )
}

export default ProductDetails