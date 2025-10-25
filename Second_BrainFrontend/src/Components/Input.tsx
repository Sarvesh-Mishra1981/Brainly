export function Input({
  onChange,
  placeholder,
  ref
}: {
  onChange?: () => void;
  placeholder: string;
  ref?:any
}) {
  return (
    <input
    ref={ref}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700 w-full transition"
    />
  );
}
