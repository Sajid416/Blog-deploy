import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const DetailsPage = () => {
  const { apiData, loading } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading blog details...</p>
        </div>
      </div>
    );
  }

  const blog = apiData.find((item) => id === String(item.id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const cleanHTML = DOMPurify.sanitize(blog.details, {
    ALLOWED_TAGS: [
      "b", "i", "em", "strong", "p", "ul", "ol", "li", "a", "br", 
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code", "pre",
      "img", "span", "div", "u", "s", "del", "ins"
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
    FORBID_ATTR: ["style", "onclick", "onerror", "onload"],
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = blog.title;

  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Image+Not+Found';
            }}
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 py-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author & Date Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={blog.authorImg}
                alt={blog.authorName}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48x48/e2e8f0/64748b?text=Author';
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{blog.authorName}</p>
                <p className="text-gray-500 text-sm">
                  {blog.created_at ? formatDate(blog.created_at) : 'Date not available'}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                title="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                title="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                title="Copy link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            style={{
              lineHeight: '1.7',
            }}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />

          {/* Author Bio Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={blog.authorImg}
                  alt={blog.authorName}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64/e2e8f0/64748b?text=Author';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Written by {blog.authorName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Published on {blog.created_at ? formatDate(blog.created_at) : 'Date not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Back to All Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;