import React from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ products, currentProductId }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => {
            const firstVariant = product.variants?.[0] || {};
            return (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={
                      firstVariant.image ||
                      firstVariant.images?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={firstVariant.name?.en || "Related product"}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {firstVariant.name?.en || "Product"}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-900 font-medium">
                      $
                      {firstVariant.discountPrice?.toFixed(2) ||
                        firstVariant.price?.toFixed(2)}
                    </span>
                    {firstVariant.discountPrice && (
                      <span className="ml-2 text-gray-500 text-sm line-through">
                        ${firstVariant.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No related products found...
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;