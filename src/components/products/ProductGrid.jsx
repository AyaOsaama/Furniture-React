import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./RatingStars";
import RatingStars from "./RatingStars";
const ProductGrid = ({
  hasLoaded,
  currentVariants,
  filteredVariants,
  resetFilters,
}) => {
  if (!hasLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 animate-pulse">
            <div className="h-66.5 bg-gray-200 w-full mb-2"></div>
            <div className="h-6 bg-gray-200 w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredVariants.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVariants.map((variant) => (
          <div key={variant._id} className="flex flex-col gap-4">
            <Link
              to={`/shop/${variant.productId}`}
              state={{ variantId: variant._id }}
            >
              <img
                src={variant.image || "/placeholder.jpg"}
                alt={variant.name?.en || "No name"}
                className="h-66.5 hover:outline-3 hover:outline-orange-500 transition-all cursor-pointer w-full object-cover mb-2"
              />
            </Link>
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold font-sans text-lg">
                {variant.name?.en || "No name"}
              </h2>
              <div className="flex items-center gap-1">
                <RatingStars averageRating={variant.averageRating} />
                <span className="text-gray-500 text-xs">
                  ({variant.ratingCount})
                </span>
              </div>
              <div className="mt-2">
                <span className="text-gray-600 font-semibold">
                  $
                  {variant.discountPrice?.toFixed(2) ||
                    variant.price?.toFixed(2) ||
                    "0.00"}
                </span>
                {variant.discountPrice && (
                  <span className="text-gray-400 line-through ml-2">
                    ${variant.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn't find any products matching your needs. Try adjusting your
        search criteria.
      </p>
      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default ProductGrid;
