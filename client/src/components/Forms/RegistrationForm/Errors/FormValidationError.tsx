import React from 'react';

type PropsType = {
  message?: string;
  className?: string;
};

export default function FormValidationError({ message }: PropsType) {
  return message ? (
    <div className="text-red-600 text-sm font-semibold mt-[-10px] mb-1">
      {message}
    </div>
  ) : null;
}
