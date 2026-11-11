import { useId } from "react";
import { RiUserLine } from "react-icons/ri";

type ClientNameFieldProps = {
  label: string;
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
};

export const ClientNameField: React.FC<ClientNameFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Nome do cliente",
}) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-200">
        {label}
      </label>
      <div className="relative">
        <RiUserLine
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-400"
        />
        <input
          id={id}
          type="text"
          value={value}
          maxLength={60}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-lg border border-gray-600 bg-gray-900 py-3 pl-10 pr-3 text-gray-100 placeholder-gray-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
};
