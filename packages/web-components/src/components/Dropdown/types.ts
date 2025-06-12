export interface DropdownItem {
  value: string | number;
  label: string;
}

export interface DropdownProps {
  label?: string;
  items: DropdownItem[];
  onChange?: (item: DropdownItem) => void;
}
