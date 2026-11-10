type DateFieldProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
};

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Selecionar data",
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
};