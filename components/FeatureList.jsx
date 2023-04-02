import React from 'react';

const FeatureList = ({ features }) => (
  <div className="flex flex-col p-4 m-2 space-y-2">
    {features.map((feature) => (
      <div key={feature} className="flex items-start space-x-2">
        <svg
          className="w-8 h-8 mt-1 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M19.707 4.293a1 1 0 00-1.414 0L7 15.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l13-13a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700">{feature}</span>
      </div>
    ))}
  </div>
);

export default FeatureList;
