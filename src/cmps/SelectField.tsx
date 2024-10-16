interface Props {
  id: string;
  label: string;
  value: string;
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const SelectField = ({
  id,
  label,
  value,
  options,
  handleChange,
  className,
}: Props) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-300 "
      >
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="border text-sm rounded-lg focus:ring-blue-500 bg-gray-600 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 text-white"
        aria-label={`${label} Level`}
      >
        {options.map((option) => (
          <option key={option} value={option} className="hover:bg-blue-600">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
