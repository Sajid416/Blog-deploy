import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const [author, setAuthor] = useState(false);
  const { fetchData } = useContext(DataContext);
  const [filterData, setFilterData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user blogs
  const handledata = async () => {
    const API="https://blog-blogapi-service.onrender.com"
    try {
      if (!token) {
        console.log("please enter token first");
        return;
      }
      const res = await axios.get(`${API}/api/myblog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilterData(res.data);
      setAuthor(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    const API="https://blog-blogapi-service.onrender.com"
    try {
      await axios.delete(`${API}/api/myblog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilterData((prev) => prev.filter((item) => item.id !== id));
      handledata();
      fetchData();
      console.log("Blog deleted successfully!!");
    } catch (error) {
      console.error("Error in Blog deleted", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* View Blog Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handledata}
            className="text-white bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition font-semibold shadow-md"
          >
            View My Blogs
          </button>
        </div>

        {/* Blog List Section */}
        <div className={author ? "space-y-4" : "hidden"}>
          {author && filterData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filterData.map((record, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border border-gray-300 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg font-bold text-gray-800 truncate">
                    {record.title}
                  </p>
                  <div className="flex gap-3 mt-4">
                    {/* Update Button */}
                    <button
                      className="flex-1 text-sm md:text-base rounded-lg text-white bg-green-500 font-semibold px-3 py-2 cursor-pointer hover:bg-green-400 transition"
                      onClick={() => navigate(`/blog/update/${record.id}`)}
                    >
                      Update
                    </button>

                    {/* Delete Button */}
                    <button
                      className="flex-1 text-sm md:text-base rounded-lg bg-red-500 text-white font-semibold px-3 py-2 cursor-pointer hover:bg-red-400 transition"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center text-lg py-10">
              No Blogs Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
