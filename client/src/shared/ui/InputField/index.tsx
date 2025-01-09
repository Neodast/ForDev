import { forwardRef, HTMLProps } from 'react';

interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, placeholder, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-blue-500 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue font-roboto"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
