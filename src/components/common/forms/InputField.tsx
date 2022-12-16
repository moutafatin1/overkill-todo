import type { InputHTMLAttributes } from "react";
import React from "react";
import { fn } from "../../../utils/fn";
import { InputWrapper } from "./InputWrapper";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  errorMessage?: string[] | string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      startIcon,
      endIcon,
      errorMessage,
      className,
      name,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <InputWrapper
        label={label}
        startIcon={startIcon}
        endIcon={endIcon}
        errorMessage={errorMessage}
        required={required}
        name={name}
      >
        <input
          ref={ref}
          name={name}
          className={fn(
            "w-full rounded-md border border-gray-300 py-2 px-3  text-gray-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500",
            startIcon && "pl-10",
            endIcon && "pr-10",
            errorMessage &&
              "border-red-300 placeholder:text-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500",
            className
          )}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={`${name}-error`}
          required={required}
          {...props}
        />
      </InputWrapper>
    );
  }
);

InputField.displayName = "InputField";
