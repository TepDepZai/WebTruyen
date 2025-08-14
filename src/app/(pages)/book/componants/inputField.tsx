const InputField = ({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-black font-medium ">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg bg-[#2b2b3a] border border-[#3d3d50] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ED7F1] outline-none"
    />
  </div>
);

export default InputField;