import React, { useState } from 'react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12">
      <div className="flex border-b border-gray-200">
        {["description", "additional", "preview"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="py-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">
              {product.description?.en || "No description available."}
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="flex justify-center">
            <p className="text-gray-500">No Additional Information</p>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="flex justify-center">
            <p className="text-gray-500">No preview available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;