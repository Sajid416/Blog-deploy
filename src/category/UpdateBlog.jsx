import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/DataContext";
import { useContext, useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const UpdateBlog = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useContext(DataContext);
  const location = useLocation()
  const previousPage = location.state?.from || "/blog/myblog";
  // React Hook Form
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      imgUrl: "",
      title: "",
      category: "",
      details: "",
      authorImg: "",
      authorName: "",
    },
  });

  // Quill editor
  const { quill, quillRef } = useQuill();

  // Sync Quill content with form
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue("details", quill.root.innerHTML, { shouldValidate: true });
      });
    }
  }, [quill, setValue]);
 const API="https://blog-blogapi-service.onrender.com"
  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/api/getone/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        reset({
          imgUrl: res.data.imgUrl,
          title: res.data.title,
          category: res.data.category,
          details: res.data.details,
          authorImg: res.data.authorImg,
          authorName: res.data.authorName,
        });

        if (quill) {
          quill.root.innerHTML = res.data.details || "";
        }
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };

    fetchBlog();
  }, [id, token, reset, quill]);

  // Image upload states
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);
  const [uploadingAuthorImg, setUploadingAuthorImg] = useState(false);

  // Image previews
  const imgUrl = watch("imgUrl");
  const authorImg = watch("authorImg");

  // Upload image function
  const uploadImage = async (e, fieldName, setUploading) => {
    const file = e.target.files[0];
    if (!file) return;
   const API="https://blog-blogapi-service.onrender.com"
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${API}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setValue(fieldName, res.data.url, { shouldValidate: true });
    } catch (error) {
      alert("Image upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
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
      const API="https://blog-blogapi-service.onrender.com"
      const res = await axios.put(`${process.env.REACT_APP_BLOG_API}/api/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert("Blog updated successfully");
        fetchData();
        reset()
        navigate(previousPage); // redirect if needed
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Error submitting blog", error);
        alert("Something went wrong while updating the blog.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl sm:text-4xl font-bold font-pacifico">
        Update Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-8 my-5 bg-gray-100 rounded shadow-lg space-y-4"
      >
        {/* Blog Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Image URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("imgUrl", { required: "Image URL is required" })}
            className="border border-gray-500 px-3 py-2 rounded-md w-full"
            placeholder="Paste image URL or upload"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e, "imgUrl", setUploadingBlogImg)}
            className="mt-2"
          />
          {uploadingBlogImg && <p>Uploading image...</p>}
          {imgUrl && (
            <img
              src={imgUrl}
              alt="Blog Preview"
              className="mt-2 max-h-48 object-contain"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="border border-gray-500 px-3 py-2 rounded-md w-full"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="border border-gray-500 px-3 py-2 rounded-md w-full"
          >
            <option value="">-- Choose a category --</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Blog Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Details <span className="text-red-500">*</span>
          </label>
          <div ref={quillRef} />
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details.message}</p>
          )}
        </div>

        {/* Author Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Image URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("authorImg", { required: "Author image is required" })}
            className="border border-gray-500 px-3 py-2 rounded-md w-full"
            placeholder="Paste author image URL or upload"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e, "authorImg", setUploadingAuthorImg)}
            className="mt-2"
          />
          {uploadingAuthorImg && <p>Uploading image...</p>}
          {authorImg && (
            <img
              src={authorImg}
              alt="Author Preview"
              className="mt-2 max-h-24 object-contain rounded-full"
            />
          )}
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("authorName", { required: "Author name is required" })}
            className="border border-gray-500 px-3 py-2 rounded-md w-full"
            placeholder="Enter author name"
          />
          {errors.authorName && (
            <p className="text-red-500 text-sm">{errors.authorName.message}</p>
          )}
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

export default UpdateBlog;
