import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";
import { useForm} from "react-hook-form";
const Add = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const API="https://blog-blogapi-service.onrender.com"
    console.log(data);
    try {
      const apiUrl = `${API}`;
      const res = await axios.post(apiUrl, data);
      if (res.status == 200) {
        console.log("Blog Submitted", res.data);
        alert("Blog Added Successfully")
        reset()
        navigate("/all")

      }
    } catch (error) {
      console.log("Error in Submitting Blog", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-8 my-5 bg-gray-100 rounded shadow-lg space-y-4"
      >
        <div className="flex flex-row justify-between gap-6">
          
          <div className="flex-1 space-y-12">
            <div className="w-1/3">
              <label
                htmlFor="imgUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ImgUrl<span className="text-red-500">*</span>
              </label>
              <input
                id="imgUrl"
                {...register("imgUrl", { required: true })}
                aria-invalid={errors.imgUrl ? "true" : "false"}
                className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Image url"
              />
              {errors.imgUrl?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Img url is required
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                {...register("category", { required: true })}
                aria-invalid={errors.category ? "true" : "false"}
                className="border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full"
              >
                <option value="">-- Choose a category --</option>
                <option value="Technology">Technology</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
              </select>

              {errors.category?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Category selection is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                {...register("title", { required: true })}
                aria-invalid={errors.title ? "true" : "false"}
                className=" border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
              />
              {errors.title?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Blog title is required
                </p>
              )}
            </div>
          </div>
          <div className="flex-2 space-y-4">
            

            {/* Blog Details Field */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="details"
                rows={4}
                cols={2}
                {...register("details", { required: true })}
                aria-invalid={errors.details ? "true" : "false"}
                className="w-full border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog details"
              />
              {errors.details?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Blog details are required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="authorImg"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author Image Url <span className="text-red-500">*</span>
              </label>
              <input
                id="authorImg"
                {...register("authorImg", { required: true })}
                aria-invalid={errors.authorImg ? "true" : "false"}
                className=" border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter author image url "
              />
              {errors.authorImg?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Author image url is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="authorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author Name<span className="text-red-500">*</span>
              </label>
              <input
                id="authorName"
                {...register("authorName", { required: true })}
                aria-invalid={errors.authorName ? "true" : "false"}
                className=" border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter author Name "
              />
              {errors.authorName?.type === "required" && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Author Name is required
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
