export type InputStatus = "info" | "warning" | "error" | "success";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus;
  help?: string;
  onSupportiveChange?: (checked: boolean) => void;
}

export interface InputHistory {
  name: string;
  values: string[];
}
