import React from "react";
import img1 from "../assets/img/img-1.png";
import img2 from "../assets/img/img-2.png";
import img3 from "../assets/img/img-3.png";
import img4 from "../assets/img/img-4.png";
import img5 from "../assets/img/img-5.png";
import img6 from "../assets/img/img-6.png";
const Services = () => {
  return (
    <div className="px-10 pb-10">
      <div>
        <h2 className="text-3xl font-semibold text-center font-pacifico p-2">
          {" "}
          Services Page{" "}
        </h2>
        <div className="flex flex-col justify-center items-center gap-2 pt-20 pb-10">
          <h3 className="mr-8 font-roboto-serif text-xl font-semibold text-green-800">
            What we offer
          </h3>
          <p className="w-[300px] text-justify text-base leading-relaxed text-gray-600 font-medium">
            There are many variations of passages of lorem ipsum available. but
            the majority have suffered alteration in some form.
          </p>
        </div>
        <div
          className="mx-auto
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
    gap-4 lg:gap-8
    p-6 lg:p-10 rounded-2xl
    sm:max-w-[680px] md:max-w-[680px] lg:max-w-none
    justify-items-center lg:justify-items-stretch"
        >
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img1}
              alt="first img"
              className="w-15 h-15 rounded-full"
            />
            <h3 className="mt-2 font-semibold">Refreshing Design</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img2}
              alt="second img"
              className="w-15 h-15 rounded-full"
            />
            <h3 className="mt-2 font-semibold">Based on Tailwind CSS</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img3}
              alt="third img"
              className="w-15 h-15 rounded-full"
            />
            <h3 className="mt-2 font-semibold">300+ Components</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img4}
              alt="fourth img"
              className="w-15 h-15 rounded-full "
            />
            <h3 className="mt-2 font-semibold">Speed Optimization</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img5}
              alt="fifth img"
              className="w-15 h-15 rounded-full"
            />
            <h3 className="mt-2 font-semibold">Regular Updates</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
          <div className="w-[260px] lg:w-[280px] h-[250px] flex flex-col items-center justify-center shadow-lg rounded-lg p-6 border border-gray-200">
            <img
              src={img6}
              alt="sixth img"
              className="w-15 h-15 rounded-full"
            />
            <h3 className="mt-2 font-semibold">Fully Customizable</h3>
            <p className="text-justify m-3 text-gray-600">
              We enjoy working with discerning clients, people for whom quality,
              services, integrity and asthetics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
