import { cn } from "@/utils";

import { input__base } from "./input.module.scss";
import type { InputProps } from "./types";

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <div>
      <input className={cn([input__base, className])} {...props} />

      <input type="checkbox" />
    </div>
  );
};

export default Input;
