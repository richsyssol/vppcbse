import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../../constant/Blog/blogData";

const BlogPage = () => {
  const navigate = useNavigate();

  const BLOGS_PER_PAGE = 3;

  const [selectedCategory, setSelectedCategory] = useState(
    blogData.categories[0]
  );
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_PAGE);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(BLOGS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BLOGS_PER_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* ================= HERO IMAGE SECTION ================= */}
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-500 mb-6">
        {blogData.hero.title}
      </h1>
      <div className="w-full relative mb-12">
        <img
          src={blogData.hero.image}
          alt="Blogs by VPP School"
          className="w-full h-64 md:h-[420px] object-cover"
        />
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:underline font-medium"
        >
          ← Home
        </button>
        <span>/</span>
        <span className="font-medium text-gray-500">Blog</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-500">{blogData.title}</h1>
      <div className="w-20 h-1 bg-orange-600 mt-3 mb-6"></div>

      <p className="max-w-2xl text-gray-600 mb-8">{blogData.description}</p>

      {/* 🔹 CATEGORY BUTTONS (Infrastructure style) */}
      <div className="flex flex-wrap gap-3 mb-10">
        {blogData.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory.id === category.id
                ? "bg-orange-400 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* 🔹 BLOG CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedCategory.blogs.slice(0, visibleCount).map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 LOAD MORE */}
      {visibleCount < selectedCategory.blogs.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
