import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
const DetailsPage = () => {
  const { apiData, loading } = useContext(DataContext);
  const { id } = useParams();
  if (loading) return <p>Loading...</p>;
  const blog = apiData.find((item) => id === String(item.id));
  if (!blog) return <p>Blog not found</p>;
  const cleanHTML = DOMPurify.sanitize(blog.details, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "ul", "li", "a", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    FORBID_ATTR: ["style"],  // style attribute বাদ দিবে
  });
  return (
  <div key={blog.id} className="w-full min-h-screen py-10">
    <h1 className="text-center text-3xl sm:text-4xl font-bold font-pacifico mb-5">
      Blog Details
    </h1>
    <div className="max-w-200 mx-auto shadow-md hover:shadow-lg rounded-md bg-gray-200 flex flex-col">
      <div className="w-full aspect-video h-80 flex items-center justify-center overflow-hidden">
        <img
          src={blog.imgUrl}
          alt="Details Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center text-2xl font-extrabold text-green-400 drop-shadow-[0_0_10px_cyan] bg-pink-500 rounded-full my-4">
        {blog.category}
      </div>
      <div className="text-center font-bold text-3xl uppercase leading-tight">
        {blog.title}
      </div>
      <div
        className="px-3 prose prose-lg max-w-none font-roboto-serif text-gray-800 leading-tight p-5 indent-8 first-letter:text-3xl first-letter:font-bold first-letter:text-blue-600 text-sm"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
      <div className="flex w-[360px] flex-row gap-4 h-40 overflow-hidden bg-gray-100 mb-5 justify-center items-center ml-2 pl-5 mt-15">
        <img
          src={blog.authorImg}
          alt="author Image"
          className="w-[200px] h-30 object-cover"
        />
        <div className="w-40 px-3 py-2 bg-white rounded-md shadow text-gray-800 pr-2">
          <p className="text-sm font-semibold truncate">{blog.authorName}</p>
          <p className="text-xs text-gray-500">
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default DetailsPage;
