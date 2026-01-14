// // components/Infrastructure/InfrastructurePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import infrastructureData from "../../constant/Aboutus/infrastructureData";

// const InfrastructurePage = () => {
//   const navigate = useNavigate();
//   const data = infrastructureData;

//   // Set first section as default
//   const [selectedSection, setSelectedSection] = useState(data.sections[0]);
//   // State for modal
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Function to open modal with image
//   const openModal = (image) => {
//     setSelectedImage(image);
//     setIsModalOpen(true);
//     // Prevent background scrolling when modal is open
//     document.body.style.overflow = "hidden";
//   };

//   // Function to close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//     // Restore scrolling
//     document.body.style.overflow = "auto";
//   };

//   // Function to navigate to next image
//   const nextImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const nextIndex = (currentIndex + 1) % selectedSection.images.length;
//     setSelectedImage(selectedSection.images[nextIndex]);
//   };

//   // Function to navigate to previous image
//   const prevImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const prevIndex =
//       (currentIndex - 1 + selectedSection.images.length) %
//       selectedSection.images.length;
//     setSelectedImage(selectedSection.images[prevIndex]);
//   };

//   // Handle keyboard navigation
//   React.useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen) return;

//       if (e.key === "Escape") {
//         closeModal();
//       } else if (e.key === "ArrowRight") {
//         nextImage();
//       } else if (e.key === "ArrowLeft") {
//         prevImage();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen, selectedImage]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//       {/* Modal Overlay */}
//       {isModalOpen && selectedImage && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Blurred Background */}
//           <div
//             className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
//             onClick={closeModal}
//           />

//           {/* Modal Container */}
//           <div className="relative min-h-screen flex items-center justify-center p-4">
//             <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
//               {/* Close Button */}
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>

//               {/* Navigation Buttons */}
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>

//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               {/* Image Container */}
//               <div className="relative h-[70vh] overflow-hidden">
//                 <img
//                   src={selectedImage.image}
//                   alt={selectedImage.alt || selectedImage.caption}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Image Info */}
//               <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-2">
//                       {selectedImage.caption}
//                     </h3>
//                     {selectedImage.description && (
//                       <p className="text-gray-300 text-lg">
//                         {selectedImage.description}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-3xl">{selectedImage.icon}</span>
//                     <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
//                       Image{" "}
//                       {selectedSection.images.findIndex(
//                         (img) => img.id === selectedImage.id
//                       ) + 1}{" "}
//                       of {selectedSection.images.length}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 {selectedImage.features &&
//                   selectedImage.features.length > 0 && (
//                     <div className="mt-4 pt-4 border-t border-gray-700">
//                       <h4 className="text-lg font-semibold mb-2">Features:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedImage.features.map((feature, idx) => (
//                           <span
//                             key={idx}
//                             className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                 {/* Section Info */}
//                 <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
//                   <div className="flex items-center gap-2">
//                     <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
//                       {selectedSection.title}
//                     </span>
//                     {selectedSection.subtitle && (
//                       <span>• {selectedSection.subtitle}</span>
//                     )}
//                   </div>
//                   {selectedImage.duration && (
//                     <div className="flex items-center gap-2">
//                       <span className="text-lg">⏱️</span>
//                       <span>{selectedImage.duration}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//         <button
//           onClick={() => navigate("/")}
//           className="text-gray-600 hover:underline font-medium flex items-center gap-1"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           Home
//         </button>
//         <span>/</span>
//         <span className="font-medium text-[#800000]">Infrastructure</span>
//       </div>

//       {/* Page Header */}
//       <div className="mb-10">
//         <h1 className=" text-2xl text-[#800000] md:text-4xl font-serif font-semibold text- mb-4">
//           Infrastructure
//         </h1>
//         <div className="w-20 h-1 bg-[#800000] mt-3 mb-4 rounded-full"></div>
//         {/* <p className="text-gray-600 text-lg max-w-3xl">
//           Explore our state-of-the-art campus facilities designed for holistic
//           learning and development.
//         </p> */}
//       </div>

//       {/* 🔹 Section Selection Buttons */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Explore Sections
//         </h2>
//         <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-start">
//   {data.sections.map((section) => (
//     <button
//       key={section.id}
//       onClick={() => setSelectedSection(section)}
//       className={`
//         w-full sm:w-auto
//         px-4 sm:px-5
//         py-3
//         rounded-lg
//         font-medium
//         transition-all duration-300
//         sm:hover:-translate-y-1
//         ${
//           selectedSection.id === section.id
//             ? "bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white shadow-lg sm:scale-105"
//             : "bg-gradient-to-r from-[#0A2342] to-[#0A2342] text-white"
//         }
//       `}
//     >
//       <div className="flex items-center justify-center sm:justify-start gap-2">
//         {/* <span className="text-lg">{section.icon || ""}</span> */}
//         <span className="text-sm sm:text-base whitespace-nowrap">
//           {section.title}
//         </span>
//       </div>
//     </button>
//   ))}
//         </div>
        
//       </div>

//       {/* 🔹 Selected Section Details */}
//       {selectedSection && (
//         <div className="mb-12">
//           {/* Section Header */}
//           <div className="mb-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//               {selectedSection.title}
//             </h2>
//             {selectedSection.subtitle && (
//               <h3 className="text-xl text-[#] font-semibold mb-3">
//                 {selectedSection.subtitle}
//               </h3>
//             )}
//             {selectedSection.description && (
//               <p className="text-gray-600 text-lg max-w-4xl leading-relaxed">
//                 {selectedSection.description}
//               </p>
//             )}
//           </div>

//           {/* Images Grid - Responsive layout */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {selectedSection.images.map((image) => (
//               <div
//                 key={image.id}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
//                 onClick={() => openModal(image)}
//               >
//                 {/* Image Container */}
//                 <div className="relative h-50 overflow-hidden">
//                   <img
//                     src={image.image}
//                     alt={image.alt || image.caption}
//                     className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
//                   />
//                   {/* Overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="absolute bottom-4 left-4 right-4">
//                       <div className="flex items-center justify-between">
//                         <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
//                           #{image.id}
//                         </span>
//                         <span className="text-white/80 text-sm">
//                           {selectedSection.title}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   {/* View Icon on hover */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="bg-black/50 text-white p-3 rounded-full">
//                       <svg
//                         className="w-8 h-8"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Caption */}
//                 <div className="p-5">
//                   <h3 className="font-semibold text-gray-800 mb-2 text-lg">
//                     {image.caption}
//                   </h3>
//                   {image.description && (
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {image.description}
//                     </p>
//                   )}

//                   {/* Features/Tags */}
//                   {image.features && image.features.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {image.features.map((feature, idx) => (
//                         <span
//                           key={idx}
//                           className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Icon */}
//                   {image.icon && (
//                     <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                       <span className="text-2xl">{image.icon}</span>
//                       {image.duration && (
//                         <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                           ⏱️ {image.duration}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Image Count Indicator */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-gray-600 text-center">
//               Showing{" "}
//               <span className="font-semibold text-orange-600">
//                 {selectedSection.images.length}
//               </span>{" "}
//               images of {selectedSection.title}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* 🔹 All Sections Overview */}
//       {/* <div className="mt-16 pt-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           All Infrastructure Sections
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data.sections.map((section) => (
//             <div
//               key={section.id}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
//               onClick={() => {
//                 setSelectedSection(section);
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
//                   <span className="text-2xl">{section.icon || "🏢"}</span>
//                 </div>
//                 <h3 className="font-bold text-gray-800 text-lg">
//                   {section.title}
//                 </h3>
//               </div>
//               <p className="text-gray-600 mb-3 line-clamp-2">
//                 {section.description}
//               </p>
//               <div className="flex items-center justify-between mt-4">
//                 <span className="text-sm text-gray-500">
//                   {section.images.length} images
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
//       </div> */}

//       {/* Back to Top Button */}
//       <div className="mt-10 flex justify-center">
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="px-6 py-3 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 10l7-7m0 0l7 7m-7-7v18"
//             />
//           </svg>
//           Back to Top
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InfrastructurePage;





// components/Infrastructure/InfrastructurePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import infrastructureData from "../../constant/Aboutus/infrastructureData";
// import { ChevronLeft, ChevronRight, X, Grid, Sliders, Home, ArrowUp, Circle, Maximize2, Eye } from "lucide-react";

// const InfrastructurePage = () => {
//   const navigate = useNavigate();
//   const data = infrastructureData;
  
//   // State for selected section
//   const [selectedSection, setSelectedSection] = useState(data.sections[0]);
//   // State for modal
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // State for controlling visible images count per section
//   const [visibleImagesCount, setVisibleImagesCount] = useState({});
//   // State for mobile device detection
//   const [isMobile, setIsMobile] = useState(false);
//   // State for view mode (grid or slider) - MOBILE ONLY
//   const [viewMode, setViewMode] = useState("grid"); // "grid" or "slider"
//   // State for slider current index (shows 2 images at a time) - MOBILE ONLY
//   const [sliderIndex, setSliderIndex] = useState(0);

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Initialize visible images count
//   useEffect(() => {
//     const initialCounts = {};
//     data.sections.forEach(section => {
//       // Show 8 images initially on desktop, 6 initially on mobile
//       initialCounts[section.id] = isMobile ? 6 : 8;
//     });
//     setVisibleImagesCount(initialCounts);
//   }, [data.sections, isMobile]);

//   // Function to open modal with image
//   const openModal = (image, section) => {
//     setSelectedImage(image);
//     setSelectedSection(section);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   // Function to close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//     document.body.style.overflow = "auto";
//   };

//   // Function to navigate to next image in modal
//   const nextImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const nextIndex = (currentIndex + 1) % selectedSection.images.length;
//     setSelectedImage(selectedSection.images[nextIndex]);
//   };

//   // Function to navigate to previous image in modal
//   const prevImage = () => {
//     const currentIndex = selectedSection.images.findIndex(
//       (img) => img.id === selectedImage.id
//     );
//     const prevIndex =
//       (currentIndex - 1 + selectedSection.images.length) %
//       selectedSection.images.length;
//     setSelectedImage(selectedSection.images[prevIndex]);
//   };

//   // Function to toggle "View All" for a section
//   const toggleViewAll = (sectionId) => {
//     setVisibleImagesCount(prev => ({
//       ...prev,
//       [sectionId]: prev[sectionId] === (isMobile ? 6 : 8) ? undefined : (isMobile ? 6 : 8)
//     }));
//   };

//   // Get visible images for a section
//   const getVisibleImages = (section) => {
//     const visibleCount = visibleImagesCount[section.id];
//     const defaultCount = isMobile ? 6 : 8;
    
//     if (visibleCount && visibleCount === defaultCount) {
//       return section.images.slice(0, defaultCount);
//     }
//     return section.images;
//   };

//   // Get images for mobile slider (shows 2 at a time)
//   const getSliderImages = (section) => {
//     const images = section.images;
//     const visibleImages = [];
    
//     for (let i = sliderIndex; i < sliderIndex + 2 && i < images.length; i++) {
//       visibleImages.push(images[i]);
//     }
    
//     // If we're at the end and need to show 2 images, add first image
//     if (visibleImages.length === 1 && images.length > 1) {
//       visibleImages.push(images[0]);
//     }
    
//     return visibleImages;
//   };

//   // Slider navigation for mobile
//   const nextSlider = () => {
//     const images = selectedSection.images;
//     setSliderIndex((prev) => (prev + 2) % images.length);
//   };

//   const prevSlider = () => {
//     const images = selectedSection.images;
//     setSliderIndex((prev) => (prev - 2 + images.length) % images.length);
//   };

//   // Go to specific slide
//   const goToSlide = (index) => {
//     setSliderIndex(index * 2); // Multiply by 2 because we show 2 images at once
//   };

//   // Function to check if a section has more than initial images
//   const hasMoreImages = (section) => {
//     const defaultCount = isMobile ? 6 : 8;
//     return section.images.length > defaultCount;
//   };

//   // Function to check if all images are visible for a section
//   const isViewAllActive = (sectionId) => {
//     const defaultCount = isMobile ? 6 : 8;
//     return !visibleImagesCount[sectionId] || visibleImagesCount[sectionId] !== defaultCount;
//   };

//   // Scroll to section
//   const scrollToSection = (section) => {
//     setSelectedSection(section);
//     setSliderIndex(0); // Reset slider when section changes
//     const element = document.getElementById(`section-${section.id}`);
//     if (element) {
//       window.scrollTo({
//         top: element.offsetTop - 80,
//         behavior: "smooth"
//       });
//     }
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen) return;
//       if (e.key === "Escape") closeModal();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen, selectedImage]);

//   // Calculate number of slide groups (2 images per slide)
//   const getSlideGroupsCount = (section) => {
//     return Math.ceil(section.images.length / 2);
//   };

//   // Get current slide group number
//   const getCurrentSlideGroup = () => {
//     return Math.floor(sliderIndex / 2) + 1;
//   };

//   // Mobile-only components
//   const MobileHeader = () => (
//     <div className="bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white py-5 px-4 mb-6 rounded-b-3xl shadow-xl">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors active:scale-95"
//           >
//             <Home className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-xl font-bold tracking-tight">Campus Infrastructure</h1>
//             <p className="text-white/80 text-xs mt-1">Vidya Prabodhini Prashala CBSE</p>
//           </div>
//         </div>
//         <div className="text-xs bg-white/20 px-3 py-1.5 rounded-full font-medium">
//           {data.sections.length} Areas
//         </div>
//       </div>
//     </div>
//   );

//   const MobileSectionTabs = () => (
//     <div className="px-4 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-base font-semibold text-gray-800">Explore Facilities</h2>
//         <div className="flex items-center gap-2">
//           {/* <span className="text-xs text-gray-500">View:</span> */}
//           {/* <div className="flex bg-gray-100 rounded-full p-1">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${viewMode === "grid" ? "bg-white text-[#800000] shadow-sm" : "text-gray-600"}`}
//             >
//               <Grid className="w-3 h-3" />
//               Grid
//             </button>
//             <button
//               onClick={() => setViewMode("slider")}
//               className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${viewMode === "slider" ? "bg-white text-[#800000] shadow-sm" : "text-gray-600"}`}
//             >
//               <Sliders className="w-3 h-3" />
//               Slider
//             </button>
//           </div> */}
//         </div>
//       </div>
//       <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
//         {data.sections.map((section) => (
//           <button
//             key={section.id}
//             onClick={() => scrollToSection(section)}
//             className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${selectedSection.id === section.id ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-md scale-105" : "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white"}`}
//           >
//             {section.title}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const MobileSliderView = ({ section }) => {
//     const sliderImages = getSliderImages(section);
//     const totalSlides = getSlideGroupsCount(section);
//     const currentSlide = getCurrentSlideGroup();

//     return (
//       <div className="px-4 mb-8">
//         {/* Section Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
//           {section.subtitle && (
//             <h3 className="text-xl text-[#800000] font-semibold mb-3">
//               {section.subtitle}
//             </h3>
//           )}
//           {section.description && (
//             <p className="text-gray-600 text-sm mt-2">{section.description}</p>
//           )}
//         </div>

//         {/* Slider Container */}
//         <div className="relative mb-6">
//           {/* Slider Navigation Buttons */}
//           <button
//             onClick={prevSlider}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors -translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           <button
//             onClick={nextSlider}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors translate-x-2"
//             disabled={selectedSection.images.length <= 2}
//           >
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>

//           {/* Slider Images (2 images side by side) */}
//           <div className="flex gap-3 overflow-hidden px-1">
//             {sliderImages.map((image, idx) => (
//               <div
//                 key={`${image.id}-${idx}`}
//                 className="flex-1 min-w-0"
//               >
//                 <div
//                   onClick={() => openModal(image, section)}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden active:scale-[0.98] transition-transform"
//                 >
//                   {/* Image Container */}
//                   <div className="relative h-44 overflow-hidden">
//                     <img
//                       src={image.image}
//                       alt={image.alt || image.caption}
//                       className="w-full h-full object-cover"
//                     />
//                     {/* View Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
//                       <div className="p-3 w-full">
//                         <div className="flex items-center justify-between">
//                           <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
//                             View
//                           </span>
//                           <Maximize2 className="w-4 h-4 text-white/80" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Image Info */}
//                   <div className="p-3">
//                     <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
//                       {image.caption}
//                     </h3>
//                     {image.features && image.features.length > 0 && (
//                       <div className="flex flex-wrap gap-1">
//                         {image.features.slice(0, 1).map((feature, idx) => (
//                           <span key={idx} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Slider Progress Dots */}
//           <div className="flex justify-center gap-1.5 mt-6">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`transition-all duration-300 ${Math.floor(sliderIndex / 2) === index ? "text-[#800000]" : "text-gray-300"}`}
//               >
//                 <Circle className={`w-2.5 h-2.5 ${Math.floor(sliderIndex / 2) === index ? "fill-current" : ""}`} />
//               </button>
//             ))}
//           </div>

//           {/* Slider Counter */}
//           <div className="text-center mt-3">
//             <span className="text-sm text-gray-600">
//               {currentSlide} / {totalSlides}
//             </span>
//             <span className="text-xs text-gray-400 mx-2">•</span>
//             <span className="text-xs text-gray-500">
//               Showing 2 of {section.images.length} images
//             </span>
//           </div>
//         </div>

//         {/* View All Images Button */}
//         {hasMoreImages(section) && (
//           <div className="text-center">
//             <button
//               onClick={() => toggleViewAll(section.id)}
//               className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//             >
//               {isViewAllActive(section.id) ? "Show Less Images" : `View All ${section.images.length} Images`}
//               <ChevronRight className={`w-4 h-4 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const MobileGridView = ({ section }) => (
//     <div className="px-4 mb-8">
//       {/* Section Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
//         {section.subtitle && (
//           <h3 className="text-xl text-[#800000] font-semibold mb-3">
//             {section.subtitle}
//           </h3>
//         )}
//         {section.description && (
//           <p className="text-gray-600 text-sm mt-2">{section.description}</p>
//         )}
//       </div>

//       {/* Images Grid */}
//       <div className="grid grid-cols-2 gap-3 mb-6">
//         {getVisibleImages(section).map((image) => (
//           <div
//             key={image.id}
//             onClick={() => openModal(image, section)}
//             className="bg-white rounded-lg shadow-md overflow-hidden active:scale-[0.98] transition-transform"
//           >
//             <div className="relative h-36 overflow-hidden">
//               <img
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
//                 <div className="absolute bottom-2 left-2">
//                   <Maximize2 className="w-4 h-4 text-white" />
//                 </div>
//               </div>
//             </div>
//             <div className="p-2">
//               <h3 className="font-medium text-gray-800 text-xs mb-1 truncate">
//                 {image.caption}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* View All Button */}
//       {hasMoreImages(section) && (
//         <div className="text-center">
//           <button
//             onClick={() => toggleViewAll(section.id)}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full font-medium hover:shadow-md transition-all duration-300 active:scale-95"
//           >
//             {isViewAllActive(section.id) ? "Show Less" : `View All ${section.images.length}`}
//             <ChevronRight className={`w-4 h-4 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   // Desktop Grid View Component
//   const DesktopGridView = ({ section }) => (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {getVisibleImages(section).map((image) => (
//           <div
//             key={image.id}
//             className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
//             onClick={() => openModal(image, section)}
//           >
//             {/* Image Container */}
//             <div className="relative h-50 overflow-hidden">
//               <img
//                 src={image.image}
//                 alt={image.alt || image.caption}
//                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
//               />
//               {/* Overlay on hover */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-4 left-4 right-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
//                       #{image.id}
//                     </span>
//                     <span className="text-white/80 text-sm">
//                       {section.title}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/* View Icon on hover */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="bg-black/50 text-white p-3 rounded-full">
//                   <Eye className="w-8 h-8" />
//                 </div>
//               </div>
//             </div>

//             {/* Caption */}
//             <div className="p-5">
//               <h3 className="font-semibold text-gray-800 mb-2 text-lg">
//                 {image.caption}
//               </h3>
//               {image.description && (
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                   {image.description}
//                 </p>
//               )}

//               {/* Features/Tags */}
//               {image.features && image.features.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {image.features.map((feature, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Icon */}
//               {image.icon && (
//                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                   <span className="text-2xl">{image.icon}</span>
//                   {image.duration && (
//                     <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                       ⏱️ {image.duration}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop View All Button */}
//       {hasMoreImages(section) && (
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={() => toggleViewAll(section.id)}
//             className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             <Eye className="w-5 h-5" />
//             <span className="font-semibold">
//               {isViewAllActive(section.id) ? "Show Less Images" : `View All ${section.images.length} Images`}
//             </span>
//             <ChevronRight className={`w-5 h-5 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
//           </button>
//         </div>
//       )}

//       {/* Image Count Indicator */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <p className="text-gray-600 text-center">
//           {isViewAllActive(section.id) ? (
//             <>
//               Showing all{" "}
//               <span className="font-semibold text-orange-600">
//                 {section.images.length}
//               </span>{" "}
//               images of {section.title}
//             </>
//           ) : (
//             <>
//               Showing{" "}
//               <span className="font-semibold text-orange-600">
//                 {getVisibleImages(section).length}
//               </span>{" "}
//               of {section.images.length} images
//             </>
//           )}
//         </p>
//       </div>
//     </>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//       {/* Modal Overlay */}
//       {isModalOpen && selectedImage && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Blurred Background */}
//           <div
//             className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
//             onClick={closeModal}
//           />

//           {/* Modal Container */}
//           <div className="relative min-h-screen flex items-center justify-center p-4">
//             <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
//               {/* Close Button */}
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               {/* Navigation Buttons */}
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>

//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>

//               {/* Image Container */}
//               <div className="relative h-[70vh] overflow-hidden">
//                 <img
//                   src={selectedImage.image}
//                   alt={selectedImage.alt || selectedImage.caption}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Image Info */}
//               <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-2">
//                       {selectedImage.caption}
//                     </h3>
//                     {selectedImage.description && (
//                       <p className="text-gray-300 text-lg">
//                         {selectedImage.description}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-3xl">{selectedImage.icon}</span>
//                     <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
//                       Image{" "}
//                       {selectedSection.images.findIndex(
//                         (img) => img.id === selectedImage.id
//                       ) + 1}{" "}
//                       of {selectedSection.images.length}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 {selectedImage.features &&
//                   selectedImage.features.length > 0 && (
//                     <div className="mt-4 pt-4 border-t border-gray-700">
//                       <h4 className="text-lg font-semibold mb-2">Features:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedImage.features.map((feature, idx) => (
//                           <span
//                             key={idx}
//                             className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                 {/* Section Info */}
//                 <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
//                   <div className="flex items-center gap-2">
//                     <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
//                       {selectedSection.title}
//                     </span>
//                     {selectedSection.subtitle && (
//                       <span>• {selectedSection.subtitle}</span>
//                     )}
//                   </div>
//                   {selectedImage.duration && (
//                     <div className="flex items-center gap-2">
//                       <span className="text-lg">⏱️</span>
//                       <span>{selectedImage.duration}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//         <button
//           onClick={() => navigate("/")}
//           className="text-gray-600 hover:underline font-medium flex items-center gap-1"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           Home
//         </button>
//         <span>/</span>
//         <span className="font-medium text-[#800000]">Infrastructure</span>
//       </div>

//       {/* Page Header */}
//       <div className="mb-10">
//         <h1 className="text-2xl text-[#800000] md:text-4xl font-serif font-semibold mb-4">
//           Infrastructure
//         </h1>
//         <div className="w-20 h-1 bg-[#800000] mt-3 mb-4 rounded-full"></div>
//       </div>

//       {/* Mobile Header */}
//       {/* {isMobile && <MobileHeader />} */}

//       {/* 🔹 Section Selection Buttons - Desktop */}
//       {!isMobile && (
//         <div className="mb-10">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             Explore Sections
//           </h2>
//           <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-start">
//             {data.sections.map((section) => (
//               <button
//                 key={section.id}
//                 onClick={() => setSelectedSection(section)}
//                 className={`
//                   w-full sm:w-auto
//                   px-4 sm:px-5
//                   py-3
//                   rounded-lg
//                   font-medium
//                   transition-all duration-300
//                   sm:hover:-translate-y-1
//                   ${selectedSection.id === section.id
//                     ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-lg sm:scale-105"
//                     : "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white"
//                   }
//                 `}
//               >
//                 <div className="flex items-center justify-center sm:justify-start gap-2">
//                   <span className="text-sm sm:text-base whitespace-nowrap">
//                     {section.title}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Mobile Navigation */}
//       {isMobile && <MobileSectionTabs />}

//       {/* 🔹 All Sections Display */}
//       {data.sections.map((section) => (
//         <div 
//           key={section.id} 
//           id={`section-${section.id}`}
//           className="mb-12 scroll-mt-20"
//         >
//           {/* Desktop Section Header */}
//           {!isMobile && (
//             <div className="mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//                 {section.title}
//               </h2>
//               {section.subtitle && (
//                 <h3 className="text-xl text-[#800000] font-semibold mb-3">
//                   {section.subtitle}
//                 </h3>
//               )}
//               {section.description && (
//                 <p className="text-gray-600 text-lg max-w-4xl leading-relaxed">
//                   {section.description}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Mobile Views */}
//           {isMobile ? (
//             viewMode === "slider" ? (
//               <MobileSliderView section={section} />
//             ) : (
//               <MobileGridView section={section} />
//             )
//           ) : (
//             // Desktop Grid View with View All Button
//             <DesktopGridView section={section} />
//           )}
//         </div>
//       ))}

//       {/* Floating Navigation for Mobile */}
//       {isMobile && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
//           <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-3 py-2">
//             <div className="flex overflow-x-auto gap-2 scrollbar-hide w-[280px]">
//               {data.sections.map((section) => (
//                 <button
//                   key={section.id}
//                   onClick={() => scrollToSection(section)}
//                   className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
//                     selectedSection.id === section.id
//                       ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {section.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Back to Top Button */}
//       <div className="mt-10 flex justify-center">
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="px-6 py-3 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
//         >
//           <ArrowUp className="w-5 h-5" />
//           Back to Top
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InfrastructurePage;

// components/Infrastructure/InfrastructurePage.jsx
// components/Infrastructure/InfrastructurePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import infrastructureData from "../../constant/Aboutus/infrastructureData";
import { ChevronLeft, ChevronRight, X, Grid, Sliders, Home, ArrowUp, Circle, Maximize2, Eye } from "lucide-react";

const InfrastructurePage = () => {
  const navigate = useNavigate();
  const data = infrastructureData;
  
  // State for selected section
  const [selectedSection, setSelectedSection] = useState(data.sections[0]);
  // State for modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for controlling visible images count per section
  const [visibleImagesCount, setVisibleImagesCount] = useState({});
  // State for mobile device detection
  const [isMobile, setIsMobile] = useState(false);
  // State for view mode (grid or slider) - MOBILE ONLY
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "slider"
  // State for slider current index (shows 2 images at a time) - MOBILE ONLY
  const [sliderIndex, setSliderIndex] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize visible images count
  useEffect(() => {
    const initialCounts = {};
    data.sections.forEach(section => {
      // Show 8 images initially on desktop, 6 initially on mobile
      initialCounts[section.id] = isMobile ? 6 : 8;
    });
    setVisibleImagesCount(initialCounts);
  }, [data.sections, isMobile]);

  // Function to open modal with image
  const openModal = (image, section) => {
    setSelectedImage(image);
    setSelectedSection(section);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Function to navigate to next image in modal
  const nextImage = () => {
    const currentIndex = selectedSection.images.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % selectedSection.images.length;
    setSelectedImage(selectedSection.images[nextIndex]);
  };

  // Function to navigate to previous image in modal
  const prevImage = () => {
    const currentIndex = selectedSection.images.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + selectedSection.images.length) %
      selectedSection.images.length;
    setSelectedImage(selectedSection.images[prevIndex]);
  };

  // Function to toggle "View All" for a section
  const toggleViewAll = (sectionId) => {
    setVisibleImagesCount(prev => ({
      ...prev,
      [sectionId]: prev[sectionId] === (isMobile ? 6 : 8) ? undefined : (isMobile ? 6 : 8)
    }));
  };

  // Get visible images for a section
  const getVisibleImages = (section) => {
    const visibleCount = visibleImagesCount[section.id];
    const defaultCount = isMobile ? 6 : 8;
    
    if (visibleCount && visibleCount === defaultCount) {
      return section.images.slice(0, defaultCount);
    }
    return section.images;
  };

  // Get images for mobile slider (shows 2 at a time)
  const getSliderImages = (section) => {
    const images = section.images;
    const visibleImages = [];
    
    for (let i = sliderIndex; i < sliderIndex + 2 && i < images.length; i++) {
      visibleImages.push(images[i]);
    }
    
    // If we're at the end and need to show 2 images, add first image
    if (visibleImages.length === 1 && images.length > 1) {
      visibleImages.push(images[0]);
    }
    
    return visibleImages;
  };

  // Slider navigation for mobile
  const nextSlider = () => {
    const images = selectedSection.images;
    setSliderIndex((prev) => (prev + 2) % images.length);
  };

  const prevSlider = () => {
    const images = selectedSection.images;
    setSliderIndex((prev) => (prev - 2 + images.length) % images.length);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setSliderIndex(index * 2); // Multiply by 2 because we show 2 images at once
  };

  // Function to check if a section has more than initial images
  const hasMoreImages = (section) => {
    const defaultCount = isMobile ? 6 : 8;
    return section.images.length > defaultCount;
  };

  // Function to check if all images are visible for a section
  const isViewAllActive = (sectionId) => {
    const defaultCount = isMobile ? 6 : 8;
    return !visibleImagesCount[sectionId] || visibleImagesCount[sectionId] !== defaultCount;
  };

  // Scroll to section - FIXED FUNCTION
  const scrollToSection = (section) => {
    setSelectedSection(section);
    setSliderIndex(0); // Reset slider when section changes
    
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const element = document.getElementById(`section-${section.id}`);
      if (element) {
        const headerOffset = isMobile ? 100 : 150;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImage]);

  // Calculate number of slide groups (2 images per slide)
  const getSlideGroupsCount = (section) => {
    return Math.ceil(section.images.length / 2);
  };

  // Get current slide group number
  const getCurrentSlideGroup = () => {
    return Math.floor(sliderIndex / 2) + 1;
  };

  // Mobile-only components
  const MobileHeader = () => (
    <div className="bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white py-4 px-4 mb-4 sm:mb-6 rounded-b-2xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors active:scale-95"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Campus Infrastructure</h1>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5">Vidya Prabodhini Prashala CBSE</p>
          </div>
        </div>
        <div className="text-xs bg-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium">
          {data.sections.length} Areas
        </div>
      </div>
    </div>
  );

  const MobileSectionTabs = () => (
    <div className="px-3 sm:px-4 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800">Explore Facilities</h2>
        <div className="flex items-center gap-1 sm:gap-2">
          
          <div className="flex bg-gray-100 rounded-full p-0.5 sm:p-1">
           
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-1.5 sm:gap-2 pb-2 scrollbar-hide">
        {data.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section)}
            className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedSection.id === section.id ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-md scale-105" : "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white opacity-90 hover:opacity-100"}`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );

  const MobileSliderView = ({ section }) => {
    const sliderImages = getSliderImages(section);
    const totalSlides = getSlideGroupsCount(section);
    const currentSlide = getCurrentSlideGroup();

    return (
      <div className="px-3 sm:px-4 mb-6 sm:mb-8">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
          {section.subtitle && (
            <h3 className="text-lg sm:text-xl text-[#800000] font-semibold mb-2 sm:mb-3">
              {section.subtitle}
            </h3>
          )}
          {section.description && (
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative  mb-4 sm:mb-6">
          {/* Slider Navigation Buttons */}
          <button
            onClick={prevSlider}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors -translate-x-1 sm:-translate-x-2"
            disabled={selectedSection.images.length <= 2}
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          </button>

          <button
            onClick={nextSlider}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 shadow-lg rounded-full flex items-center justify-center hover:bg-white transition-colors translate-x-1 sm:translate-x-2"
            disabled={selectedSection.images.length <= 2}
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          </button>

          {/* Slider Images (2 images side by side) */}
          <div className="flex gap-2 sm:gap-3 overflow-hidden px-0.5 sm:px-1">
            {sliderImages.map((image, idx) => (
              <div
                key={`${image.id}-${idx}`}
                className="flex-1 min-w-0"
              >
                <div
                  onClick={() => openModal(image, section)}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden active:scale-[0.98] transition-transform"
                >
                  {/* Image Container */}
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.alt || image.caption}
                      className="w-full h-full object-cover"
                    />
                    {/* View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-2 sm:p-3 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-xs font-medium bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            View
                          </span>
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="p-2 sm:p-3">
                    <h3 className="font-medium sm:font-semibold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1 truncate">
                      {image.caption}
                    </h3>
                    {image.features && image.features.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 sm:gap-1">
                        {image.features.slice(0, 1).map((feature, idx) => (
                          <span key={idx} className="px-1.5 sm:px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Progress Dots */}
          <div className="flex justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${Math.floor(sliderIndex / 2) === index ? "text-[#800000]" : "text-gray-300"}`}
              >
                <Circle className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${Math.floor(sliderIndex / 2) === index ? "fill-current" : ""}`} />
              </button>
            ))}
          </div>

          {/* Slider Counter */}
          <div className="text-center mt-2 sm:mt-3">
            <span className="text-xs sm:text-sm text-gray-600">
              {currentSlide} / {totalSlides}
            </span>
            <span className="text-xs text-gray-400 mx-1 sm:mx-2">•</span>
            <span className="text-xs text-gray-500">
              Showing 2 of {section.images.length} images
            </span>
          </div>
        </div>

        {/* View All Images Button */}
        {hasMoreImages(section) && (
          <div className="text-center">
            <button
              onClick={() => toggleViewAll(section.id)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {isViewAllActive(section.id) ? "Show Less Images" : `View All ${section.images.length} Images`}
              <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const MobileGridView = ({ section }) => (
    <div className="px-3 sm:px-4 mb-6 sm:mb-8">
      {/* Section Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{section.title}</h2>
        {section.subtitle && (
          <h3 className="text-lg sm:text-xl text-[#800000] font-semibold mb-2 sm:mb-3">
            {section.subtitle}
          </h3>
        )}
        {section.description && (
          <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">{section.description}</p>
        )}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {getVisibleImages(section).map((image) => (
          <div
            key={image.id}
            onClick={() => openModal(image, section)}
            className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden active:scale-[0.98] transition-transform"
          >
            <div className="relative h-32 sm:h-36 overflow-hidden">
              <img
                src={image.image}
                alt={image.alt || image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="p-1.5 sm:p-2">
              <h3 className="font-medium text-gray-800 text-xs mb-0.5 sm:mb-1 truncate">
                {image.caption}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {hasMoreImages(section) && (
        <div className="text-center">
          <button
            onClick={() => toggleViewAll(section.id)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-md transition-all duration-300 active:scale-95"
          >
            {isViewAllActive(section.id) ? "Show Less" : `View All ${section.images.length}`}
            <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );

  // Desktop Grid View Component
  const DesktopGridView = ({ section }) => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {getVisibleImages(section).map((image) => (
          <div
            key={image.id}
            className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer"
            onClick={() => openModal(image, section)}
          >
            {/* Image Container */}
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-50 overflow-hidden">
              <img
                src={image.image}
                alt={image.alt || image.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 sm:from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-1 rounded-full">
                      #{image.id}
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm">
                      {section.title}
                    </span>
                  </div>
                </div>
              </div>
              {/* View Icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/40 sm:bg-black/50 text-white p-1.5 sm:p-2 md:p-3 rounded-full">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-3 sm:p-4 md:p-5">
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2">
                {image.caption}
              </h3>
              {image.description && (
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                  {image.description}
                </p>
              )}

              {/* Features/Tags */}
              {image.features && image.features.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                  {image.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Icon */}
              {image.icon && (
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xl sm:text-2xl">{image.icon}</span>
                  {image.duration && (
                    <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                      ⏱️ {image.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View All Button */}
      {hasMoreImages(section) && (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={() => toggleViewAll(section.id)}
            className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">
              {isViewAllActive(section.id) ? "Show Less Images" : `View All ${section.images.length} Images`}
            </span>
            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isViewAllActive(section.id) ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      {/* Image Count Indicator */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <p className="text-gray-600 text-xs sm:text-sm text-center">
          {isViewAllActive(section.id) ? (
            <>
              Showing all{" "}
              <span className="font-semibold text-orange-600">
                {section.images.length}
              </span>{" "}
              images of {section.title}
            </>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-orange-600">
                {getVisibleImages(section).length}
              </span>{" "}
              of {section.images.length} images
            </>
          )}
        </p>
      </div>
    </>
  );

  // Fixed Desktop section button handler
  const handleDesktopSectionClick = (section) => {
    setSelectedSection(section);
    // Scroll to the section after a small delay
    setTimeout(() => {
      scrollToSection(section);
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
      {/* Modal Overlay */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Background */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="relative w-full max-w-4xl lg:max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>

              {/* Image Container */}
              <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt || selectedImage.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                      {selectedImage.caption}
                    </h3>
                    {selectedImage.description && (
                      <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                        {selectedImage.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <span className="text-xl sm:text-2xl md:text-3xl">{selectedImage.icon}</span>
                    <span className="text-xs sm:text-sm bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
                      Image{" "}
                      {selectedSection.images.findIndex(
                        (img) => img.id === selectedImage.id
                      ) + 1}{" "}
                      of {selectedSection.images.length}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {selectedImage.features &&
                  selectedImage.features.length > 0 && (
                    <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-700">
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedImage.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700 text-gray-200 rounded-full text-xs sm:text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Section Info */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-gray-400 text-xs sm:text-sm gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="bg-orange-500/20 text-orange-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                      {selectedSection.title}
                    </span>
                    {selectedSection.subtitle && (
                      <span className="hidden sm:inline">• {selectedSection.subtitle}</span>
                    )}
                  </div>
                  {selectedImage.duration && (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm">⏱️</span>
                      <span>{selectedImage.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-[#800000] font-medium flex items-center gap-1"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="hidden xs:inline">Home</span>
        </button>
        <span>/</span>
        <span className="font-medium text-[#800000]">Infrastructure</span>
      </div>

      {/* Page Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#800000] mb-2 sm:mb-4">
          Infrastructure
        </h1>
        <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-[#800000] rounded-full"></div>
      </div>

      {/* Mobile Header */}
      {/* {isMobile && <MobileHeader />} */}

      {/* 🔹 Section Selection Buttons - Desktop */}
      {!isMobile && (
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">
            Explore Sections
          </h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {data.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleDesktopSectionClick(section)}
                className={`
                  w-full md:w-50 px-3 sm:px-4 md:px-5 py-2 sm:py-3
                  rounded-lg text-xs sm:text-sm md:text-base font-medium
                  transition-all duration-300 hover:-translate-y-1
                  ${selectedSection.id === section.id
                    ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white shadow-lg scale-105"
                    : "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white opacity-90 hover:opacity-100"
                  }
                `}
              >
                <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                  <span className="truncate">{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && <MobileSectionTabs />}

      {/* 🔹 All Sections Display */}
      {data.sections.map((section) => (
        <div 
          key={section.id} 
          id={`section-${section.id}`}
          className="mb-8 sm:mb-10 md:mb-12 scroll-mt-16 sm:scroll-mt-20"
        >
          {/* Desktop Section Header */}
          {!isMobile && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-lg sm:text-xl text-[#800000] font-semibold mb-2 sm:mb-3">
                  {section.subtitle}
                </h3>
              )}
              {section.description && (
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
                  {section.description}
                </p>
              )}
            </div>
          )}

          {/* Mobile Views */}
          {isMobile ? (
            viewMode === "slider" ? (
              <MobileSliderView section={section} />
            ) : (
              <MobileGridView section={section} />
            )
          ) : (
            // Desktop Grid View with View All Button
            <DesktopGridView section={section} />
          )}
        </div>
      ))}

      {/* Floating Navigation for Mobile */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-2 sm:px-3 py-1.5 sm:py-2">
            <div className="flex overflow-x-auto gap-1 sm:gap-2 scrollbar-hide w-[260px] sm:w-[280px]">
              {data.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section)}
                  className={`flex-shrink-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedSection.id === section.id
                      ? "bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#0A2343] to-[#0A2343] text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-1 sm:gap-2"
        >
          <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default InfrastructurePage;