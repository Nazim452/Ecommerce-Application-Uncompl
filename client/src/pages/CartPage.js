

import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
// import DropIn from 'braintree-web-drop-in-react'
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import '../styles/CartStyle.css'



const CartPage = () => {
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      //we telling currency is US doller
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      //jo bhi id hame delete ke liye diya gaya hai(pid) . agar wo itemke id se match hota hai u se suse delte kar do
      let index = myCart.findIndex((item) => item._id === pid);
      //The second parameter (1 in this case) specifies the number of elements to remove starting from the index position specified by the first parameter
      myCart.splice(index, 1);
      setCart(myCart);
      //saving inlocalStorage if we refresh after tha we can get all cartItem

      //ye wala mujh me kam nahi kar arha hai


      //localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token 
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get('/api/v1/product/braintree/token');
  //     setClientToken(data?.clientToken);

  //   } catch (error) {
  //     console.log("Error in getToken: ", error);

  //   }
  // }

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);


  //handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      //nonce - see documentation
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce, cart
      })

      setLoading(false);
      localStorage.removeItem('cart');
      setCart([])
      navigate('/dashboard/user/orders');
      toast.success("Payment completed successfully")


    } catch (error) {
      console.log("Error in handle payment method", error);
      setLoading(false);

    }

  }
  // useEffect(() => {
  //   getToken();

  // }, [auth?.token])



  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        //dashboard par navigate nahi karke cart par navigate karega
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}

                <div className="mt-2">


                </div>
              </div>
            )}


            <div className="mt-2">
              {
                !clientToken || !cart?.length ? ("") : (
                  <>


                    <DropIn

                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: 'vault'
                        },
                      }}
                      onInstance={instance => setInstance(instance)}

                    />


                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                   

                    > {!loading?"Make Payment":"Payment in Processing.."}</button>




                  </>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;