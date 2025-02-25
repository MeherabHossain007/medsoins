import React from "react";

const Button = ({ children, className, href, onClick }) => {
  return (
    <>
      {!!href ? (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          className={`block px-4 py-2.5 lg:px-8 lg:py-5 rounded-full bg-secondary text-white font-bold text-xs lg:text-lg ${className}`}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`px-4 py-2.5 lg:px-8 lg:py-5 rounded-full bg-secondary text-white font-bold text-xs lg:text-lg ${className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
