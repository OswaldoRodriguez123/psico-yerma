import type { ComponentPropsWithoutRef } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "size"> & {
  size?: "sm" | "md";
  wrapperClassName?: string;
};

const paddings = { sm: "1.75rem", md: "2.25rem" };
const chevrons = {
  sm: "right-2 h-3.5 w-3.5",
  md: "right-3 h-4 w-4",
};

export function Select({
  size = "md",
  wrapperClassName = "",
  className = "",
  style,
  children,
  ...props
}: SelectProps) {
  return (
    <span className={`relative block ${wrapperClassName}`}>
      <select
        {...props}
        style={{ paddingRight: paddings[size], ...style }}
        className={`appearance-none ${className}`}
      >
        {children}
      </select>
      <ChevronDownIcon
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-soft ${chevrons[size]}`}
      />
    </span>
  );
}
