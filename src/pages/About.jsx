import React, { useContext } from "react";
import img from "../assets/img/office.jpg";
import { DataContext } from "./../context/DataContext";
import { MdOutlineLibraryBooks } from "react-icons/md";
const About = () => {
  const { apiData, loading } = useContext(DataContext);
  console.log(apiData);
  const authorCountMap = new Map();
  for (const author of apiData) {
    const { authorImg, authorName } = author;
    if (authorCountMap.has(authorName)) {
      authorCountMap.get(authorName).publicationCount++;
    } else {
      authorCountMap.set(authorName, {
        authorImg,
        authorName,
        publicationCount: 1,
      });
    }
  }
  const result = Array.from(authorCountMap.values())
    .filter((author) => author.publicationCount > 0)
    .sort((a, b) => b.publicationCount - a.publicationCount);

  return (
    <div className="p-10 pt-3 pl-5 md:pl-15 ">
      <div className="flex flex-col mr-5">
        <h2 className="text-center font-bold text-2xl font-pacifico p-2 mb-20">
          About Us
        </h2>
        <div className="flex flex-col  md:flex-row gap-7">
          <div className="w-[800px] h-[280px] overflow-hidden ">
            <img
              src={img}
              alt="about"
              className="w-[430px] md:w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-[1000px] flex flex-col gap-2">
            <h3 className="text-red-700 text-lg md:text-xl">Who we are ?</h3>
            <h1 className="text-xl md:text-2xl font-bold font-roboto-serif">
              We provide high quality articles & blogs
            </h1>
            <p className="text-sm md:text-md text-justify w-[430px] md:w-[500px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Provident mollitia, ad sunt facere accusamus, numquam error culpa
              atque beatae, reprehenderit cum? Odio hic nam perspiciatis
              deleniti, aut neque sunt quidem.
            </p>
            <p className="text-sm md:text-md text-justify w-[430px] md:w-[500px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad in
              expedita dolores nesciunt dolor, ratione vero laudantium
              voluptates dolorem illo quaerat at voluptatem eos nulla sequi
              culpa reiciendis iste exercitationem.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="pt-10 text-2xl md:text-3xl text-bold">
            <h1>Top Authors</h1>
          </div>
          <div className="border-b-1 border-b-gray-300"></div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 p-4">
              {result.slice(0,3).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-4 shadow-lg rounded-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
                  style={{ minWidth: "280px", height: "250px" }}
                >
                  <img
                    src={item.authorImg}
                    alt={`Author Image of ${item.authorName}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <p className="font-semibold text-xl leading-tight text-center">
                    {item.authorName}
                  </p>
                  <div className="text-gray-600 text-md text-center flex flex-row">
                    <div><MdOutlineLibraryBooks className="mt-2" /> </div>
                    <p>Published Articles: 
                    <span className="text-blue-600 text-xl font-bold">
                      {item.publicationCount}
                    </span> </p> 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
