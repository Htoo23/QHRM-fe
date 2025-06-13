import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, className = '', error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default Input;
