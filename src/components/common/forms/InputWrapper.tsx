import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

type InputWrapperProps = {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  errorMessage?: string[] | string;
  children: React.ReactNode;
  className?: string;
  name?: string;
  required?: boolean;
};

export const InputWrapper = ({
  label,
  children,
  startIcon,
  endIcon,
  errorMessage,
  className,
  name,
  required,
}: InputWrapperProps) => {
  return (
    <label className="w-full space-y-1">
      {label && (
        <span className="mb-1 block text-sm font-medium capitalize text-gray-700">
          {label} {required && "*"}
        </span>
      )}
      <span className="relative rounded-md shadow-sm">
        {/* Leading Icon */}
        {startIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xl text-gray-600">
            {startIcon}
          </span>
        )}

        {/* Input */}
        {children}

        {/* Trailing Icon */}
        {endIcon && !errorMessage && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-gray-600">
            {endIcon}
          </span>
        )}

        {/* Error Icon */}
        {errorMessage && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-red-500">
            <AiFillExclamationCircle className="" />
          </span>
        )}
      </span>

      {/* Error */}
      {errorMessage && (
        <p
          id={`${name}-error`}
          role="alert"
          className="absolute mt-2 text-sm text-red-600"
        >
          {errorMessage}
        </p>
      )}
    </label>
  );
};
