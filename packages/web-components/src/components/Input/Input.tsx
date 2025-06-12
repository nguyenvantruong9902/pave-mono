import { useCallback, useId, useRef, useState } from "react";

import { cn } from "@/utils";

import { Dropdown } from "../Dropdown/Dropdown";
import type { InputHistory, InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  label,
  status,
  help,
  name = "input",
  className,
  disabled,
  onChange,
  ...props
}) => {
  const id = useId();
  const wrapperHelpRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>();
  const [isSupportive, setIsSupportive] = useState(true);
  const [histories, setHistories] = useState<InputHistory[]>(
    JSON.parse(localStorage.getItem("histories") ?? "[]")
  );

  const handleSaveHistory = useCallback(
    (value: string) => {
      const valueTrimmed = value.trim();

      if (status !== "success" || !valueTrimmed) return;

      const newHistories = [...histories];
      const history = newHistories.find((h) => h.name === name);

      if (history) {
        const uniqueValues = [...new Set([valueTrimmed, ...history.values])];
        history.values = uniqueValues;
      } else {
        newHistories.push({ name: name, values: [valueTrimmed] });
      }

      setHistories(newHistories);
      localStorage.setItem("histories", JSON.stringify(newHistories));
    },
    [histories, status, name]
  );

  return (
    <div className="w-full max-w-[26.75rem]">
      <label htmlFor={`input-${id}`} className="block mb-2 text-sm">
        {label}
      </label>
      <input
        id={`input-${id}`}
        name={name}
        value={inputValue}
        disabled={disabled}
        className={cn(
          "h-10 min-w-full px-3 py-2 rounded-lg text-md text-dark bg-gray-base border border-gray focus-within:outline-gray",
          disabled
            ? {}
            : {
                "border-info focus-within:outline-info": status === "info",
                "border-success focus-within:outline-success":
                  status === "success",
                "border-warning focus-within:outline-warning":
                  status === "warning",
                "border-error focus-within:outline-error": status === "error",
              },
          className
        )}
        onBlur={(evt) => handleSaveHistory(evt.target.value)}
        onChange={(evt) => {
          onChange?.(evt);
          setInputValue(evt.target.value);
        }}
        {...props}
      />

      <div className="flex items-center justify-between mt-1.5">
        <div className="inline-flex items-center">
          <label
            className={cn("flex items-center relative cursor-pointer", {
              "cursor-not-allowed": disabled,
            })}
          >
            <input
              id={`supportive-${id}`}
              disabled={disabled}
              defaultChecked
              type="checkbox"
              className={cn(
                "peer h-4 w-4 text-[0.9375rem] cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300",
                {
                  "cursor-not-allowed bg-gray border-gray": disabled,
                  "checked:bg-primary-400 checked:border-primary-400":
                    !disabled,
                }
              )}
              onClick={() => setIsSupportive(!isSupportive)}
            />

            <span className="absolute opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.736 2.74125C10.8834 2.59133 11.1285 2.58569 11.2832 2.72856C11.438 2.87144 11.4438 3.1089 11.2963 3.25883L4.90408 9.75883C4.83099 9.83314 4.72933 9.87509 4.62339 9.87504C4.5175 9.87497 4.4162 9.83269 4.34321 9.75834L1.15287 6.50834L1.12666 6.47954C1.00651 6.3293 1.02131 6.11239 1.16647 5.97856C1.31166 5.84474 1.53564 5.84161 1.68451 5.96538L1.71323 5.99174L4.62339 8.9561L10.736 2.74125Z"
                  fill="#F9FAFB"
                />
              </svg>
            </span>
          </label>

          <label
            htmlFor={`supportive-${id}`}
            className={cn(
              "ml-1.5 text-xs/normal text-gray-semi cursor-pointer",
              {
                "cursor-not-allowed": disabled,
              }
            )}
          >
            Supportive
          </label>
        </div>

        <Dropdown
          label="History"
          items={
            histories
              .find((h) => h.name === name)
              ?.values.map((v) => ({ value: v, label: v })) || []
          }
          onChange={(item) => setInputValue(item.value.toString())}
        />
      </div>

      {help && (
        <div
          ref={wrapperHelpRef}
          className={cn("text-gray mt-1 text-xs", {
            "text-info": status === "info",
            "text-warning": status === "warning",
            "text-success": status === "success",
            "text-error": status === "error",
          })}
        >
          {help}
        </div>
      )}
    </div>
  );
};

export default Input;
