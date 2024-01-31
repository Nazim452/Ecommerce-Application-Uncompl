
// import { createContext, useContext,useState } from "react"


// const SearchContext = createContext();
// const SearchProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         keyword:"",
//         results:[],
      
//     });






//     return (
//         <SearchContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </SearchContext.Provider>
//     )
// }


// //custom hook

// const useSearch = () => useContext(SearchContext);
// export { useSearch, SearchProvider };






// import { useState, useContext, createContext } from "react";

// const SearchContext = createContext();
// const SearchProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     keyword: "",
//     results: [],
//   });

//   return (
//     <SearchContext.Provider value={[auth, setAuth]}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // custom hook
// const useSearch = () => useContext(SearchContext);

// export { useSearch, SearchProvider };




import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "", // Changed from "keyword" to "results" to match the state structure
    results: [], // Added an empty array for results
  });

  return (
    <SearchContext.Provider value={{ values, setValues }}> {/* Changed value to an object */}
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };



