"use client"

import { useState, useEffect } from "react";

const Dishes = () => {
    const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/foods");
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
        <div>
            Dishes
        </div>
    )
}
export default Dishes