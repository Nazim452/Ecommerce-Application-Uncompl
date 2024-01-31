


//custom hook for get category

import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory(){
    const [categories,setCategories] = useState([]);

    //get category
   const getCategories = async() =>{
    try {
        const {data} = await axios.get('/api/v1/category/get-category');
        setCategories(data?.category);
        
    } catch (error) {
        console.log("Error in getCategory in useCategory.js",error);
        
    }
   }
   useEffect(()=>{
    getCategories()
   },[])

   //return for  use globally
   return categories;

}







