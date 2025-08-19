import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate()
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true)
    console.log("Auth API URL:", process.env.REACT_APP_AUTH_API);

    try{
      const res=await fetch(`${process.env.REACT_APP_AUTH_API}/register`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(data)
      } 
      )
      const result= await res.json()
      if(res.ok)
      {
        alert("Registration Successful")
        reset()
        navigate("/login",{replace:true})
      }
      else{
        alert(result.msg||"Registration Failed")
      }
    }
    catch(error){
      console.error(error)
      alert("Something went wrong")
    }
    setLoading(false)
  };

  return (
    <div className="p-10 flex justify-center items-center">
      <div className="w-[540px] max-w-[600px] flex flex-col gap-10 p-10 shadow-lg border border-gray-300 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Create Account</h1>
        <form autoComplete="off" className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row flex-nowrap gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-gray-700 text-md">
                  FullName
                </label>
                <input
                  type="text"
                  id="fullName"
                  autoComplete="new-fullName"
                  {...register("fullName", {
                    required: "FullName is required",
                  })}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  placeholder="Enter Your FullName"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm font-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-700 text-md">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="new-email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="Enter Email Address"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {" "}
                <label htmlFor="password" className="text-gray-700 text-md">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message: "Password must be strong",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="Enter Password"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium mt-1">
                    {errors.password.type === "required"
                      ? "Please enter your password"
                      : errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="userName" className="text-gray-700 text-md">
                  Username
                </label>
                <input
                  type="text"
                  autoComplete="new-username"
                  id="userName"
                  {...register("userName", {
                    required: "UserName is required",
                  })}
                  aria-invalid={errors.userName ? "true" : "false"}
                  placeholder="Enter Your userName"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm font-sm mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-gray-700 text-md">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  autoComplete="new-phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  placeholder="Enter your phone number"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm font-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPass" className="text-gray-700 text-md">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="new-confirmpass"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm password"
                  className="px-4 py-2 text-md font-medium bg-gray-50 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400 mt-1 transition"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm font-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm font-medium">Gender</label>
            <div className="flex items-center gap-7 mt-1">
              <label className="flex items-center gap-1 text-md text-gray-700  ">
                <input
                  type="radio"
                  value="Male"
                  {...register("gender", {
                    required: "Please select your gender",
                  })}
                  className="text-gray-700 text-sm"
                />
                Male
              </label>
              <label className="flex items-center gap-1 text-md text-gray-700 ">
                <input
                  type="radio"
                  value="Female"
                  {...register("gender", {
                    required: "Please select your gender",
                  })}
                  className="text-gray-700 text-sm"
                />
                Female
              </label>
              <label className="flex items-center gap-1 text-md text-gray-700 ">
                <input
                  type="radio"
                  className="text-gray-700 text-sm"
                  value="Prefer not to say"
                  {...register("gender", {
                    required: "Please select your gender",
                  })}
                />
                Prefer not to say
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-500 px-4 py-2 rounded-xl text-center text-white font-semibold cursor-pointer">            
              Sign Up          
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
