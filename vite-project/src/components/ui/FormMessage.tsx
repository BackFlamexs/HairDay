type FormMessageProps = {
  message: string | null;
  variant?: "error" | "success";
};

export const FormMessage: React.FC<FormMessageProps> = ({ message, variant = "error" }) => {
  if (!message) return null;

  const styles =
    variant === "error"
      ? "border-red-500/40 bg-red-500/10 text-red-300"
      : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";

  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={`rounded-lg border px-3 py-2 text-sm ${styles}`}
    >
      {message}
    </p>
  );
};
