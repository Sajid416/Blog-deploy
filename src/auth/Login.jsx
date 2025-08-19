import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const Login = () => {
  const [user,setUser]=useState(false)
  const navigate=useNavigate()
  const {setIsLoggedIn}=useContext(DataContext)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const validatePassword = (value) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return strongPasswordRegex.test(value) || 
      "Password must be at least 6 characters, include uppercase, lowercase, number, and special character.";
  };
  const API = "https://blog-authapi-service.onrender.com";
  const onSubmit = async (data) => {
    try{
      const res=await fetch(`${API}/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)

      })
      const result=await res.json()
      if(res.ok){
        localStorage.setItem("token",result.token)
         alert("Login Successful")
         setIsLoggedIn(true)
         reset()
         navigate("/",{replace:true})
         setUser(true)
      }
      else{
        console.log("error",result.error)
        alert(result.msg||"Login Failed")
      }
    }
    catch(error){
      console.error("Login Error:",error)
      alert("Something went wrong")
    }

  };

  return (
    <div className="w-full p-10 pt-10 flex items-center justify-center">
      <div className="w-[380px] max-w-[400px] flex flex-col items-center justify-center p-5 gap-5 shadow-xl border border-gray-200 rounded-2xl">
        <h1 className="font-bold text-gray-900 text-3xl">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"  className="flex flex-col gap-3 w-full">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              autoComplete="new-email" 
              {...register("email", { required: "Email is required" })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Enter Email Address"
              className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password" 
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password"
              className="px-4 py-2 mt-1 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <input
            type="submit"
            value="Sign in"
            className="w-full bg-blue-500 px-4 py-2 rounded-lg cursor-pointer font-medium text-white hover:bg-blue-600 transition"
          />
        </form>

        <h2 className="text-md mb-5 text-gray-700">
          Don't have an account? 
          <Link to="/register">
          <span className="text-blue-500 cursor-pointer">Sign up</span>
          </Link>
          
        </h2>
      </div>
    </div>
  );
};

export default Login;
