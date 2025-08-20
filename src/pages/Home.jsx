import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './../context/DataContext';


const Home = () => {
  const {apiData,loading}=useContext(DataContext)
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-gray-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-bold mb-2 md:mb-4 text-3xl md:text-5xl">Welcome to BlogVerse</h1>
          <p className="text-md md:text-xl">Discover stories, ideas, and insights that inspire.</p>
          <Link
            to="all"
            className=" mt-3 md:mt-6 inline-block bg-white text-sm md:text-md text-blue-700 font-semibold px-3 py-2 md:px-6 md:py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Explore All Blogs
          </Link>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
  <h2 className="text-xl md:text-3xl font-semibold mb-6">Browse by Category</h2>
  
  <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-white ml-10">
    {['Technology', 'Food', 'Health', 'Education', 'Sports', 'Travel'].map((category, index) => {
      return (
        <div
          key={index}
          className="bg-gray-700 p-2 rounded-lg text-center font-semibold w-[100px]"
        >
          {category}
        </div>
      );
    })}
  </div>
</div>
      </section>

      {/* Latest Blogs */}
      <section className="py-10 bg-white ">
        <div className="max-w-5xl px-6 pb-4">
          <h2 className=" text-xl md:text-3xl font-semibold mb-6">Latest Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 ml-16">
            {apiData.slice(0,3).map((item,index) => (
              <div
                key={index}
                className="bg-gray-100 h-[260px] md:h-[300px] shadow-lg rounded-2xl hover:shadow-xl transition w-[300px] md:w-full"
              > 
                <img
                  src={item.imgUrl}
                  alt="Blog Cover"
                  className="w-full h-25 object-cover rounded-t-2xl"
                />
                <h3 className="text-md md:text-xl font-semibold mb-2 ml-2">{item.title}</h3>
                <p className='text-orange-400 ml-2 text-sm md:text-md'>{item.category}</p>
                <div
                      className="text-sm text-gray-600 mb-3 line-clamp-2 ml-2"
                    >
                     {item.details} 
                  </div>
                <Link
                  to={`/details/${item.id}`}
                  className="text-blue-600 flex justify-center text-sm md:text-md items-center hover:underline font-medium ml-2 pb-4"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
