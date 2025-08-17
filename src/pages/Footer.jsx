import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline */}
        <div className=''>
          <h2 className="text-2xl font-bold mb-2 font-pacifico text-center">BlogVerse</h2>
          <p className="text-sm text-gray-400">
            A universe of where diverse ideas and stories come alive through engaging blog posts. It connects readers with insightful content across tech, food, lifestyle, and more. Explore, learn, and share your passion with BlogVerse!
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col justify-center items-center'>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline text-gray-300">Home</Link></li>
            <li><Link to="/all" className="hover:underline text-gray-300">All Blogs</Link></li>
            <li><Link to="/about" className="hover:underline text-gray-300">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className='flex flex-col justify-center items-center'>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-300 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BlogVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
