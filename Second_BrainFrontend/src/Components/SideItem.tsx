import type { ReactElement } from "react";

interface SidebarProps {
  text: string;
  icon: ReactElement;
}

export function SidebarItem({ text, icon }: SidebarProps) {
  return (
    <div
      className="
        flex items-center gap-3 px-4 py-2
        rounded-xl cursor-pointer select-none
        bg-transparent hover:bg-purple-300
        transition-colors duration-200 ease-in-out
      "
    >
      <div className="text-gray-700">{icon}</div>
      <span className="text-gray-800 font-medium tracking-wide">{text}</span>
    </div>
  );
}
