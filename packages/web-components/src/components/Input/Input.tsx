import { useCallback, useId, useRef, useState } from "react";

import { cn } from "@/utils";

import type { InputHistory, InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  status,
  help,
  name = "input",
  className,
  ...props
}) => {
  const id = useId();
  const wrapperHelpRef = useRef<HTMLDivElement>(null);

  const [isSupportive, setIsSupportive] = useState(true);
  const [histories, setHistories] = useState<InputHistory[]>(
    JSON.parse(localStorage.getItem("histories") || "[]")
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
      <input
        name={name}
        className={cn(
          "h-10 min-w-full px-3 py-2 rounded-lg bg-gray-base border border-gray focus-within:outline-gray",
          {
            "border-info focus-within:outline-info": status === "info",
            "border-success focus-within:outline-success": status === "success",
            "border-warning focus-within:outline-warning": status === "warning",
            "border-error focus-within:outline-error": status === "error",
          },
          className
        )}
        onBlur={(evt) => handleSaveHistory(evt.target.value)}
        {...props}
      />

      <div className="flex items-center justify-between mt-2">
        <div className="inline-flex items-center">
          <label
            className={cn("flex items-center relative cursor-pointer", {
              "cursor-not-allowed": props.disabled,
            })}
          >
            <input
              id={id}
              disabled={props.disabled}
              defaultChecked
              type="checkbox"
              className={cn(
                "peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300",
                {
                  "cursor-not-allowed bg-gray border-gray": props.disabled,
                  "checked:bg-blue-600 checked:border-blue-600":
                    !props.disabled,
                }
              )}
              onClick={() => setIsSupportive(!isSupportive)}
            />

            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>

          <label
            htmlFor={id}
            className={cn(
              "ml-2 text-sm font-medium text-gray-semi cursor-pointer",
              {
                "cursor-not-allowed": props.disabled,
              }
            )}
          >
            Supportive
          </label>
        </div>

        <div>
          <span className="mr-1 text-sm font-medium text-gray-semi">
            History
          </span>
          <span className="text-sm font-medium text-gray-semi">
            {histories
              .find((h) => h.name === name)
              ?.values?.map((history) => <span key={history}>{history}</span>)}
          </span>
        </div>
      </div>

      {isSupportive && help && (
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
