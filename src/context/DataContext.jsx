import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu,setMenu]=useState(true)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token without verifying signature
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000); // current time in seconds

        if (payload.exp && payload.exp > now) {
          setIsLoggedIn(true);
        } else {
          // Token expired
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  
    const fetchData = useCallback(async () => {
      const API="https://blog-blogapi-service.onrender.com"
      try {
        const apiUrl = `${API}`;
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          if (response.data.StatusText === "OK") {
            setApiData(response.data.blog_records);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error?.response || error.message);
      }
    },[]);  
    useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <DataContext.Provider
      value={{ apiData, loading,fetchData, isLoggedIn, setIsLoggedIn,menu,setMenu }}
    >
      {children}
    </DataContext.Provider>
  );
};
