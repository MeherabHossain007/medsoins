import React from "react";

function IconInput({
  svg,
  placeholder,
  children,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <div
      className={`p-3 border border-gray-200 rounded-full bg-white ${className}`}
    >
      <label className="input flex items-center">
        {svg}
        <input
          type="text"
          className={`grow ml-2 ${inputClassName}`}
          placeholder={placeholder}
          {...props}
        />
        {children}
      </label>
    </div>
  );
}

export default IconInput;
