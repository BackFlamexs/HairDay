import { useId } from "react";

type DateFieldProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
  min?: string;
};

export const DateField: React.FC<DateFieldProps> = ({ label, value, onChange, min }) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-200">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        required
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-3 text-gray-100 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
      />
    </div>
  );
};
