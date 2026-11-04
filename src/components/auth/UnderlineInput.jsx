
export default function UnderlineInput({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`w-full border-0 border-b border-gray-400 bg-transparent py-3 text-sm tracking-wide text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-0 ${className}`}
      {...props}
    />
  );
}