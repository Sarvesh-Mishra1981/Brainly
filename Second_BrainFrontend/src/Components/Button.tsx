import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  startIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClass = {
  primary:
    "bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400 disabled:cursor-not-allowed",
  secondary:
    "bg-purple-200 hover:bg-purple-300 text-purple-700 disabled:bg-purple-100 disabled:text-purple-400 disabled:cursor-not-allowed",
};

const baseStyles =
  "inline-flex flex-row items-center justify-center gap-2 rounded-md font-medium px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400";

export function Button({
  varient,
  startIcon,
  text,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${variantClass[varient]}
        ${baseStyles}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {startIcon && (
        <span className="flex items-center justify-center h-4 w-4">
          {startIcon}
        </span>
      )}
      <span className="flex items-center leading-none">
        {loading ? "Loading..." : text}
      </span>
    </button>
  );
}
