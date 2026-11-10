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
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
        placeholder={placeholder}
        autoComplete="name"
      />
    </div>
  );
};