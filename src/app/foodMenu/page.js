"use client"

import Nav from "../_components/nav/left-nav";
import { useState, useEffect } from "react";

const foodMenu = () => {
    const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/categories");
            const result = await response.json();
            console.log(result);
            setData(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    return(
        <div className="bg-gray-300 h-screen">
            <Nav
            fillMenu={true}/>
        </div>
    )
}

export default foodMenu