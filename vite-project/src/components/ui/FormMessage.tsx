type FormMessageProps = {
  isError: boolean;
  message: string;
};

export const FormMessage: React.FC<FormMessageProps> = ({
  isError,
  message,
}) => {
  if (!isError) return null;

  return (
    <p className="text-sm text-red-400 mt-1">
      {message}
    </p>
  );
};