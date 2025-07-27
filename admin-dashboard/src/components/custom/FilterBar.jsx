import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  const options = ["All", "pending", "Resolved", "in-progress"];

  return (
    <div className="flex space-x-4 mb-6">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === option
              ? "bg-red-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-red-800 hover:text-white"
          }`}
          onClick={() => setFilter(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
