// components/Gallery/Images.jsx

// components/Gallery/Images.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Images as ImagesIcon, X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import kgGalleryData from "../../constant/GalleryData/kgGalleryData";
import primarySecondaryGalleryData from "../../constant/GalleryData/primarySecondaryGalleryData";

const Images = () => {
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState({ categories: [] });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Lazy loading state
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleImages, setVisibleImages] = useState(new Set());
  const observerRef = useRef(null);
  const imageRefs = useRef({});

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) { // Mobile
        setItemsPerPage(8);
      } else if (window.innerWidth < 1024) { // Tablet
        setItemsPerPage(12);
      } else { // Desktop
        setItemsPerPage(16);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Combine gallery data from both files
  useEffect(() => {
    const loadGalleryData = () => {
      try {
        console.log("Loading gallery data...");
        
        // Create combined data
        const combinedData = {
          categories: []
        };

        // Add KG section if valid
        if (kgGalleryData && kgGalleryData.subcategories && kgGalleryData.subcategories.length > 0) {
          console.log("Adding KG Gallery Data:", kgGalleryData.title);
          combinedData.categories.push(kgGalleryData);
        }

        // Add Primary & Secondary section if valid
        if (primarySecondaryGalleryData && primarySecondaryGalleryData.subcategories && primarySecondaryGalleryData.subcategories.length > 0) {
          console.log("Adding Primary Secondary Data:", primarySecondaryGalleryData.title);
          combinedData.categories.push(primarySecondaryGalleryData);
        }

        console.log("Final Combined Data:", combinedData);
        setGalleryData(combinedData);

        // Set initial selections
        if (combinedData.categories.length > 0) {
          const firstCategory = combinedData.categories[0];
          console.log("Setting first category:", firstCategory.title);
          setSelectedCategory(firstCategory);

          if (firstCategory.subcategories && firstCategory.subcategories.length > 0) {
            const firstSubCategory = firstCategory.subcategories[0];
            console.log("Setting first subcategory:", firstSubCategory.title);
            setSelectedSubCategory(firstSubCategory);
          }
        }
        
        // Reset pagination and loading states
        setCurrentPage(1);
        setLoadedImages({});
        setVisibleImages(new Set());
        setIsInitializing(true);
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          setIsInitializing(false);
          // Load first batch of images immediately
          loadInitialImages();
        }, 300);
      } catch (error) {
        console.error("Error in loadGalleryData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  // Load initial images immediately (for better UX on refresh)
  const loadInitialImages = () => {
    if (!selectedSubCategory || !selectedSubCategory.items) return;
    
    const initialImageIds = selectedSubCategory.items
      .slice(0, Math.min(4, itemsPerPage))
      .map(item => `${selectedSubCategory.id}-${item.id}`);
    
    setLoadedImages(prev => {
      const updated = { ...prev };
      initialImageIds.forEach(id => {
        updated[id] = true;
      });
      return updated;
    });
  };

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    if (!selectedSubCategory || isInitializing) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imageId = entry.target.dataset.imageId;
            if (imageId) {
              // Mark image as visible
              setVisibleImages(prev => new Set(prev).add(imageId));
              
              // Load the image
              setTimeout(() => {
                setLoadedImages(prev => ({ ...prev, [imageId]: true }));
              }, 100);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // Start loading slightly before entering viewport
        threshold: 0.1
      }
    );

    // Observe all image elements
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observerRef.current.observe(ref);
    });

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selectedSubCategory, currentPage, isInitializing]);

  // Handle image load
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => ({ ...prev, [imageId]: true }));
  };

  // Handle image error
  const handleImageError = (e, imageId, fallbackUrl) => {
    console.error(`Image failed to load: ${imageId}`);
    e.target.src = fallbackUrl || "https://via.placeholder.com/400x300?text=Image+Not+Found";
    setLoadedImages(prev => ({ ...prev, [imageId]: true }));
  };

  // Get current items for pagination
  const getCurrentItems = () => {
    if (!selectedSubCategory || !selectedSubCategory.items) return [];
    
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    
    return selectedSubCategory.items.slice(startIndex, endIndex);
  };

  // Manual pagination functions
  const nextPage = () => {
    if (selectedSubCategory && selectedSubCategory.items && 
        currentPage * itemsPerPage < selectedSubCategory.items.length) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top on mobile/tablet
      if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // Scroll to top on mobile/tablet
      if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Calculate total pages
  const totalPages = selectedSubCategory && selectedSubCategory.items 
    ? Math.ceil(selectedSubCategory.items.length / itemsPerPage)
    : 0;

  // Handle category selection
  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category.title);
    setSelectedCategory(category);
    if (category.subcategories && category.subcategories.length > 0) {
      setSelectedSubCategory(category.subcategories[0]);
    } else {
      setSelectedSubCategory(null);
    }
    // Reset states
    setCurrentPage(1);
    setLoadedImages({});
    setVisibleImages(new Set());
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      loadInitialImages();
    }, 100);
  };

  // Handle subcategory selection
  const handleSubCategoryClick = (subcategory) => {
    console.log("Subcategory clicked:", subcategory.title);
    setSelectedSubCategory(subcategory);
    // Reset states
    setCurrentPage(1);
    setLoadedImages({});
    setVisibleImages(new Set());
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      loadInitialImages();
    }, 100);
  };

  // Loading skeleton component
  const ImageSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:underline font-medium text-sm sm:text-base"
          >
            ← Home
          </button>
          <span>/</span>
          <span className="font-medium text-gray-500">Gallery</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center h-48 sm:h-64 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#800000]"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading gallery data...</p>
        </div>
      </div>
    );
  }

  // Check if we have data
  if (!galleryData.categories || galleryData.categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="flex items-center gap-2 mb-4 sm:mb-6 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:underline font-medium text-sm sm:text-base"
          >
            ← Home
          </button>
          <span>/</span>
          <span className="font-medium text-gray-500">Gallery</span>
        </div>
        <div className="text-center py-12 sm:py-16">
          <ImagesIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
            No Gallery Data Found
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Please check the gallery data files.
          </p>
        </div>
      </div>
    );
  }

  // If no category is selected, select the first one
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000]"></div>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentItems();
  const hasMoreItems = selectedSubCategory && selectedSubCategory.items && 
    currentPage * itemsPerPage < selectedSubCategory.items.length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6 text-sm text-gray-600">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:underline font-medium text-sm sm:text-base"
        >
          ← Home
        </button>
        <span>/</span>
        <span className="font-medium text-gray-500">Gallery</span>
      </div>

      {/* Page Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-[#800000] mb-2 sm:mb-4">
        Gallery
      </h1>
      <div className="w-16 sm:w-20 h-1 bg-[#800000] mt-2 sm:mt-3 mb-4 sm:mb-6"></div>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl">
        Explore photos from our school events, activities, and celebrations.
      </p>

      {/* 🔹 Category Selection */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
        {galleryData.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full font-medium transition cursor-pointer whitespace-nowrap text-sm sm:text-base ${
              selectedCategory?.id === category.id
                ? "bg-[#0A2342] text-white shadow"
                : "bg-gray-100 sm:bg-gray-200 text-gray-700 hover:bg-gray-200 sm:hover:bg-gray-300"
            }`}
          >
            {category.icon} {category.title}
          </button>
        ))}
      </div>

      {/* 🔹 Sub-Category Selection */}
      {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 overflow-x-auto pb-2">
          {selectedCategory.subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => handleSubCategoryClick(subcategory)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                selectedSubCategory?.id === subcategory.id
                  ? "bg-[#0A2342] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {subcategory.icon} {subcategory.title}
            </button>
          ))}
        </div>
      )}

      {/* Selected Category Info */}
      {selectedSubCategory && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {selectedSubCategory.title}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
            <p className="text-gray-600 text-sm sm:text-base">
              {selectedSubCategory.items?.length || 0} photos • Showing {currentItems.length} of {selectedSubCategory.items?.length || 0}
            </p>
            
            {/* Manual Pagination Controls - Show on mobile and tablet */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={!hasMoreItems}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    !hasMoreItems
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔹 Gallery Grid */}
      {selectedSubCategory && selectedSubCategory.items && selectedSubCategory.items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {isInitializing ? (
              // Show skeletons on initial load
              Array.from({ length: Math.min(itemsPerPage, 8) }).map((_, index) => (
                <ImageSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              // Show actual images
              currentItems.map((item, index) => {
                const imageId = `${selectedSubCategory.id}-${item.id}`;
                const isLoaded = loadedImages[imageId];
                const isVisible = visibleImages.has(imageId);
                const shouldLoad = isLoaded || isVisible || index < 4; // Always load first 4 images

                return (
                  <div
                    key={imageId}
                    ref={el => {
                      imageRefs.current[imageId] = el;
                    }}
                    data-image-id={imageId}
                    className="group bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 overflow-hidden">
                      {/* Loading skeleton */}
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
                      )}
                      
                      {/* Actual image */}
                      <img
                        src={shouldLoad ? item.image : ""}
                        alt={item.alt || item.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isLoaded 
                            ? 'group-hover:scale-110 opacity-100' 
                            : 'opacity-0'
                        }`}
                        loading={index < 4 ? "eager" : "lazy"} // Load first 4 images eagerly
                        onLoad={() => handleImageLoad(imageId)}
                        onError={(e) => handleImageError(e, imageId, item.image)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-800 line-clamp-1 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      {item.date && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Loading indicator for lazy loading */}
          {hasMoreItems && !isInitializing && (
            <div className="flex justify-center items-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-[#800000]"></div>
              <p className="ml-3 sm:ml-4 text-gray-600 text-sm sm:text-base">Loading more photos...</p>
            </div>
          )}

          {/* Manual Pagination Controls - Desktop */}
          {totalPages > 1 && (
            <div className="hidden sm:flex items-center justify-center gap-4 mt-8 sm:mt-10 md:mt-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm sm:text-base ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        // Scroll to top on mobile/tablet
                        if (window.innerWidth < 1024) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium ${
                        currentPage === pageNum
                          ? 'bg-[#0A2342] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={nextPage}
                disabled={!hasMoreItems}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm sm:text-base ${
                  !hasMoreItems
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <ImagesIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
            No Photos Available in this Category
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Please select another category or subcategory.
          </p>
        </div>
      )}

      {/* 🔹 Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full bg-white rounded-lg sm:rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/70 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/90 transition"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Image */}
            <div className="max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt || selectedImage.title}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>

            {/* Image Details */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2 sm:gap-0">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{selectedSubCategory?.icon || ""}</span>
                  <span className="text-xs sm:text-sm bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
                    {selectedCategory?.title || "Gallery"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-200 pt-4 gap-2 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-4">
                  {selectedImage.date && (
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        {new Date(selectedImage.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                  {selectedSubCategory?.title || "Gallery"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 All Categories Overview */}
      <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          All Gallery Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryData.categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
              onClick={() => {
                handleCategoryClick(category);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-3 text-xs sm:text-sm">
                {category.subcategories?.length || 0} subcategories
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs sm:text-sm text-gray-500">
                  {(category.subcategories || []).reduce(
                    (total, sub) => total + (sub.items?.length || 0),
                    0
                  )}{" "}
                  photos
                </span>
                <span className="text-orange-600 font-medium flex items-center gap-1 text-sm">
                  View
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;


// // components/Gallery/Images.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Images as ImagesIcon, X, Calendar } from "lucide-react";
// import kgGalleryData from "../../constant/GalleryData/kgGalleryData";
// import primarySecondaryGalleryData from "../../constant/GalleryData/primarySecondaryGalleryData";

// const Images = () => {
//   const navigate = useNavigate();
//   const [galleryData, setGalleryData] = useState({ categories: [] });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Combine gallery data from both files
//   useEffect(() => {
//     const loadGalleryData = () => {
//       try {
//         console.log("Loading gallery data...");
        
//         // Create combined data
//         const combinedData = {
//           categories: []
//         };

//         // Add KG section if valid
//         if (kgGalleryData && kgGalleryData.subcategories && kgGalleryData.subcategories.length > 0) {
//           console.log("Adding KG Gallery Data:", kgGalleryData.title);
//           combinedData.categories.push(kgGalleryData);
//         }

//         // Add Primary & Secondary section if valid
//         if (primarySecondaryGalleryData && primarySecondaryGalleryData.subcategories && primarySecondaryGalleryData.subcategories.length > 0) {
//           console.log("Adding Primary Secondary Data:", primarySecondaryGalleryData.title);
//           combinedData.categories.push(primarySecondaryGalleryData);
//         }

//         console.log("Final Combined Data:", combinedData);
//         setGalleryData(combinedData);

//         // Set initial selections
//         if (combinedData.categories.length > 0) {
//           const firstCategory = combinedData.categories[0];
//           console.log("Setting first category:", firstCategory.title);
//           setSelectedCategory(firstCategory);

//           if (firstCategory.subcategories && firstCategory.subcategories.length > 0) {
//             const firstSubCategory = firstCategory.subcategories[0];
//             console.log("Setting first subcategory:", firstSubCategory.title);
//             setSelectedSubCategory(firstSubCategory);
//           }
//         }
//       } catch (error) {
//         console.error("Error in loadGalleryData:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadGalleryData();
//   }, []);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-600 hover:underline font-medium"
//           >
//             ← Home
//           </button>
//           <span>/</span>
//           <span className="font-medium text-gray-500">Gallery</span>
//         </div>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800000]"></div>
//           <p className="ml-4 text-gray-600">Loading gallery data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Check if we have data
//   if (!galleryData.categories || galleryData.categories.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-600 hover:underline font-medium"
//           >
//             ← Home
//           </button>
//           <span>/</span>
//           <span className="font-medium text-gray-500">Gallery</span>
//         </div>
//         <div className="text-center py-16">
//           <ImagesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">
//             No Gallery Data Found
//           </h3>
//           <p className="text-gray-500">
//             Please check the gallery data files.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Handle category selection
//   const handleCategoryClick = (category) => {
//     console.log("Category clicked:", category.title);
//     setSelectedCategory(category);
//     if (category.subcategories && category.subcategories.length > 0) {
//       setSelectedSubCategory(category.subcategories[0]);
//     } else {
//       setSelectedSubCategory(null);
//     }
//   };

//   // Handle subcategory selection
//   const handleSubCategoryClick = (subcategory) => {
//     console.log("Subcategory clicked:", subcategory.title);
//     setSelectedSubCategory(subcategory);
//   };

//   // If no category is selected, select the first one
//   if (!selectedCategory) {
//     handleCategoryClick(galleryData.categories[0]);
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000]"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//         <button
//           onClick={() => navigate("/")}
//           className="text-gray-600 hover:underline font-medium"
//         >
//           ← Home
//         </button>
//         <span>/</span>
//         <span className="font-medium text-gray-500">Gallery</span>
//       </div>

//       {/* Page Header */}
//       <h1 className="text-2xl text-[#800000] md:text-4xl font-serif font-semibold mb-4">Gallery</h1>
//       <div className="w-20 h-1 bg-[#800000] mt-3 mb-6"></div>
//       <p className="max-w-2xl text-gray-600 mb-8">
//         Explore photos from our school events, activities, and celebrations.
//       </p>

//       {/* 🔹 Category Selection */}
//       <div className="flex flex-wrap gap-3 mb-8">
//         {galleryData.categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategoryClick(category)}
//             className={`px-5 py-2 rounded-full font-medium transition cursor-pointer ${
//               selectedCategory?.id === category.id
//                 ? "bg-[#0A2342] text-white shadow"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {category.icon} {category.title}
//           </button>
//         ))}
//       </div>

//       {/* 🔹 Sub-Category Selection */}
//       {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
//         <div className="flex flex-wrap gap-3 mb-10">
//           {selectedCategory.subcategories.map((subcategory) => (
//             <button
//               key={subcategory.id}
//               onClick={() => handleSubCategoryClick(subcategory)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
//                 selectedSubCategory?.id === subcategory.id
//                   ? "bg-[#0A2342] text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {subcategory.icon} {subcategory.title}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Selected Category Info */}
//       {selectedSubCategory && (
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {selectedSubCategory.title}
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {selectedSubCategory.items?.length || 0} photos
//           </p>
//         </div>
//       )}

//       {/* 🔹 Gallery Grid */}
//       {selectedSubCategory && selectedSubCategory.items && selectedSubCategory.items.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {selectedSubCategory.items.map((item) => (
//             <div
//               key={`${selectedSubCategory.id}-${item.id}`}
//               className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//               onClick={() => setSelectedImage(item)}
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.alt || item.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   onError={(e) => {
//                     console.error("Image failed to load:", item.image);
//                     e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800 line-clamp-1">
//                   {item.title}
//                 </h3>
//                 {item.date && (
//                   <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
//                     <Calendar className="w-4 h-4" />
//                     {new Date(item.date).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <ImagesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">
//             No Photos Available in this Category
//           </h3>
//           <p className="text-gray-500">
//             Please select another category or subcategory.
//           </p>
//         </div>
//       )}

//       {/* 🔹 Image Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
//           <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
//             >
//               <X size={24} />
//             </button>

//             {/* Image */}
//             <div className="max-h-[70vh] overflow-hidden">
//               <img
//                 src={selectedImage.image}
//                 alt={selectedImage.alt || selectedImage.title}
//                 className="w-full h-full object-contain"
//               />
//             </div>

//             {/* Image Details */}
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     {selectedImage.title}
//                   </h3>
//                   {selectedImage.description && (
//                     <p className="text-gray-600 mt-2">
//                       {selectedImage.description}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl">{selectedSubCategory?.icon || ""}</span>
//                   <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
//                     {selectedCategory?.title || "Gallery"}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <div className="flex items-center gap-4">
//                   {selectedImage.date && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Calendar className="w-5 h-5" />
//                       <span>
//                         {new Date(selectedImage.date).toLocaleDateString(
//                           "en-US",
//                           {
//                             weekday: "long",
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           }
//                         )}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                   {selectedSubCategory?.title || "Gallery"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 All Categories Overview */}
//       <div className="mt-16 pt-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           All Gallery Categories
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {galleryData.categories.map((category) => (
//             <div
//               key={category.id}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
//               onClick={() => {
//                 handleCategoryClick(category);
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
//                   <span className="text-2xl">{category.icon}</span>
//                 </div>
//                 <h3 className="font-bold text-gray-800 text-lg">
//                   {category.title}
//                 </h3>
//               </div>
//               <p className="text-gray-600 mb-3 text-sm">
//                 {category.subcategories?.length || 0} subcategories
//               </p>
//               <div className="flex items-center justify-between mt-4">
//                 <span className="text-sm text-gray-500">
//                   {(category.subcategories || []).reduce(
//                     (total, sub) => total + (sub.items?.length || 0),
//                     0
//                   )}{" "}
//                   photos
//                 </span>
//                 <span className="text-orange-600 font-medium flex items-center gap-1">
//                   View
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Images;