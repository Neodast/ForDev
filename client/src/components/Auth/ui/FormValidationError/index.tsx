type FormValidationErrorProps = {
  message: string;
};

export function FormValidationError({ message }: FormValidationErrorProps) {
  return (
    <div className="text-red-600 text-sm font-semibold mt-[-10px] mb-1">
      {message}
    </div>
  );
}
