import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { DataContext } from "../context/DataContext";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(DataContext);

  const { register, setValue, watch, formState: { errors }, reset, handleSubmit } = useForm({
    defaultValues: { details: "" }
  });

  // Quill editor
  const { quill, quillRef } = useQuill();

  // Sync quill content with react-hook-form
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue("details", quill.root.innerHTML, { shouldValidate: true });
      });
    }
  }, [quill, setValue]);

  // Image uploads
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);
  const [uploadingAuthorImg, setUploadingAuthorImg] = useState(false);
  const [blogImgPreview, setBlogImgPreview] = useState("");
  const [authorImgPreview, setAuthorImgPreview] = useState("");

  const imgUrl = watch("imgUrl");
  const authorImg = watch("authorImg");

  useEffect(() => setBlogImgPreview(imgUrl || ""), [imgUrl]);
  useEffect(() => setAuthorImgPreview(authorImg || ""), [authorImg]);

  const API = "https://blog-blogapi-service.onrender.com";

  const uploadImage = async (e, fieldName, setUploading) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      setValue(fieldName, res.data.url, { shouldValidate: true });
    } catch (error) {
      alert("Image upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("imgUrl", data.imgUrl);
      formData.append("authorImg", data.authorImg);
      formData.append("authorName", data.authorName);
      formData.append("details", data.details);

      const res = await axios.post(`${API}/api`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        alert("Blog Added Successfully");
        fetchData();
        reset();
        if (quill) quill.setContents([]); // clear editor
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Error submitting blog", error);
        alert("Something went wrong while adding the blog.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow-lg space-y-4">
        
        {/* Blog Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Image <span className="text-red-500">*</span></label>
          <input {...register("imgUrl", { required: "Image URL is required" })} placeholder="Paste image URL" className="border px-3 py-2 rounded w-full" />
          <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "imgUrl", setUploadingBlogImg)} className="mt-2" />
          {uploadingBlogImg && <p>Uploading image...</p>}
          {blogImgPreview && <img src={blogImgPreview} alt="Blog Preview" className="mt-2 max-h-48 object-contain" />}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input {...register("title", { required: "Title is required" })} placeholder="Enter blog title" className="border px-3 py-2 rounded w-full" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
          <select {...register("category", { required: "Category is required" })} className="border px-3 py-2 rounded w-full">
            <option value="">-- Choose a category --</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blog Details <span className="text-red-500">*</span></label>
          <div ref={quillRef} className="bg-white p-2 rounded border" />
          {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
        </div>

        {/* Author Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Image <span className="text-red-500">*</span></label>
          <input {...register("authorImg", { required: "Author image is required" })} placeholder="Paste author image URL" className="border px-3 py-2 rounded w-full" />
          <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "authorImg", setUploadingAuthorImg)} className="mt-2" />
          {uploadingAuthorImg && <p>Uploading image...</p>}
          {authorImgPreview && <img src={authorImgPreview} alt="Author Preview" className="mt-2 max-h-24 object-contain rounded-full" />}
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Name <span className="text-red-500">*</span></label>
          <input {...register("authorName", { required: "Author name is required" })} placeholder="Enter author name" className="border px-3 py-2 rounded w-full" />
          {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save</button>
      </form>
    </div>
  );
};

export default CreateBlog;
