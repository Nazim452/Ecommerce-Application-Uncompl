import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { FaFlagCheckered } from 'react-icons/fa6';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const HomePage = () => {

  const navigate = useNavigate();
  const {cart,setCart} = useCart([]);

  const { auth, setAuth } = useAuth();
  // const { products, setProducts } = useState([]);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category); //category controller ke line 86 par  hamne reaponse me category bheja tha is liye category ko fetch karn hai
      }

    } catch (error) {
      console.log("Error in product.js/admin/page", error);
      //toast.error("Something wennt wrong with createCategory")

    }
  }

  //get products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);

      setProduct(data.products);  //products  hamne response me pass kiya tha

    } catch (error) {
      setLoading(false);
      console.log("Error in fetching all products in product.json: " + error);
      // toast.error("Something went wrong")

    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id);

    }
    else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }



  //get Filter-produt _______________________________________________________________________


  const filterProduct = async () => {
    try {
      //checked,radio - controller me jo pass kiya gaya h ai wo yahan se pass karna parega
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
      setProduct(data?.products);

    } catch (error) {
      console.log("Error in Filter-produt in HOmePage.js", error);

    }
  }




  //get Total count _____________________________________________

  // const getTotal = async (req, res) => {
  //   try {
  //     const { data } = await axios.get('/api/v1/product/product-count')
  //     setTotal(data?.total)

  //   } catch (error) {
  //     console.log("Error in getTotal in HOmePage", error);

  //   }
  // }


  // useEffect(()=>{
  //   if(page==1) return;
  //   loadMore()

  // },[page])



  // //LoadMOre handler
  // const loadMore = async()=>{
  //   try {
  //     setLoading(true);
  //     const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     //load more me pichhla wala sra product bhi le liya hai aur new wala bhi product le liya hai
  //     setProduct([...product,...data?.products]);


      
  //   } catch (error) {
  //     console.log("Error in loadMore",error);
  //     setLoading(false)
      
  //   }
  // }


   //getTOtal COunt
   const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  useEffect(() => {
    //checked ya rdio button select nahi hai tab hi yah call hoga otherwise filter wala call hoga
    if (!checked.length || !radio.length) getAllProducts();
    getAllCategories();
    getTotal();
  }, [])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio])




  return (
    <Layout title={'All Products - Best Offers'}>

      <div className="row mt-3">
        <div className="col-md-3">


          <h4 className='text-center'>Filter By Category</h4>
          <div className="d-flex flex-column">
            {
              categories.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))
            }
          </div>
          {/* Price filter___________________________________________________________________ */}


          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className="d-flex flex-column">


            <Radio.Group onChange={(e) => setRadio(e.target.value)}>

              {
                Prices.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>

                  </div>
                ))
              }




            </Radio.Group>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}>Reset All Filter</button>

            </div>
          </div>
        </div>

        <div className="col-md-9">
          {/* For test purpose we are checking ----------  {JSON.stringify(radio,null,4)} */}
          <h1 className="text-center">  All Products</h1>
          <div className="d-flex flex-wrap">
            {product.map((p) => (

              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p?.name}
                  height={350}
                  style={{ objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  <button 
                  className='btn btn-primary ms-1'
                  onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button 
                  className='btn btn-secondary ms-1'

                  onClick={()=>{
                    setCart([...cart,p])
                    toast.success("Item added to cart successfully")

                  }}
                 
                  >Add to Cart</button>

                </div>
              </div>


            ))}
          </div>
          <div className='m-2 p-3'>
            {product && product.length<total && (
              <button
              className='btn btn-warning'
              onClick={(e)=>{
                e.preventDefault();
                setPage(page+1);
              }}
              
              >
                {loading?"Loading...":"Loadmore"}
              </button>
            )}
            </div>




        


        </div>
      </div>





    </Layout>
  )
}

export default HomePage




