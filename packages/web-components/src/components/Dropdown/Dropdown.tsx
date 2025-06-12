import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/utils";

import type { DropdownProps } from "./types";

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onChange,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="inline-flex items-center cursor-pointer"
        onClick={onToggle}
      >
        <span className="mr-1 text-xs/normal text-primary-500">{label}</span>

        <span>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1713 5.45312H8.01796H4.27796C3.63796 5.45312 3.31796 6.22646 3.77129 6.67979L7.22462 10.1331C7.77796 10.6865 8.67796 10.6865 9.23129 10.1331L10.5446 8.81979L12.6846 6.67979C13.1313 6.22646 12.8113 5.45312 12.1713 5.45312Z"
              fill="#1A58D2"
            />
          </svg>
        </span>
      </button>

      <div
        ref={popupRef}
        className={cn(
          "absolute z-10 min-w-60 rounded-lg bg-white transition-all duration-300 ease-in-out mt-0 shadow-md",
          {
            "mt-1 max-h-[18.0625rem]": open,
          }
        )}
      >
        {open && (
          <ul className="p-1 overflow-y-auto max-h-[13.875rem]">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.value}
                  className="relative cursor-pointer select-none text-sm py-1 px-2 rounded hover:bg-gray"
                  onClick={() => onChange?.(item)}
                >
                  <span className="block truncate text-xs">{item.label}</span>
                </li>
              ))
            ) : (
              <li className="text-center py-1">
                <span className="text-xs text-gray-semi">No Data</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
