import React, { FC, RefObject } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  value,
  error,
  handleChange,
  inputRef,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-300"
      >
        {label}:
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        aria-label={`${label} Description`}
        ref={inputRef}
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
