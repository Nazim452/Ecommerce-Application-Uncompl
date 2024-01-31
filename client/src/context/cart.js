
// import { useState, useContext, createContext, useEffect } from "react";

// const CartContext = createContext();
// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(()=>{{
//     let existingCartItem = localStorage.getItem("cart");
//     if(existingCartItem) setCart(JSON.parse(existingCartItem))
//   }},[])

//   return (
//     <CartContext.Provider value={{cart, setCart }}> {/* Changed value to an object */}
//       {children}
//     </CartContext.Provider>
//   );
// };

// // custom hook
// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };





// import { useState, useContext, createContext, useEffect } from "react";

// const CartContext = createContext();
// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     let existingCartItem = localStorage.getItem("cart");
//     if (existingCartItem) setCart(JSON.parse(existingCartItem));
//   }, []);

//   return (
//     <CartContext.Provider value={[cart, setCart]}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // custom hook
// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };




//GPT




import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

