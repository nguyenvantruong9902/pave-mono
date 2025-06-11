import { useState } from "react";

import { cn } from "@/utils";

import type { InputProps, InputStatus } from "./types";

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const [status, setStatus] = useState<InputStatus>();

  return (
    <div className="w-fit">
      <input
        className={cn(
          "h-10 min-w-[26.75rem] px-3 py-2 rounded-lg bg-gray-base border border-gray focus-within:outline-gray",
          {
            [`border-${status}`]: status,
            [`focus-within:outline-${status}`]: status,
          },
          className
        )}
        {...props}
      />

      <div className="flex justify-between">
        <input type="checkbox" />

        <div>
          <span>History</span>
        </div>
      </div>
    </div>
  );
};

export default Input;
