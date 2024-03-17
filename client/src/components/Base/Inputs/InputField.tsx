import { ChangeEventHandler } from 'react';

interface InputFieldProps {
  value: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function InputField({
  value,
  label,
  type,
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <div className='mb-4'>
      <label className='block text-blue-500 text-sm font-bold mb-2'>
        {label}
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue'
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
