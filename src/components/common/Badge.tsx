import React from "react";
import { cn } from "./Button";

type BadgeVariant = "green" | "blue" | "purple" | "orange" | "red" | "gray";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  green: "bg-[#E8F7F0] text-[#17B26A]",
  blue: "bg-[#EEF0FF] text-[#3B41E3]",
  purple: "bg-[#F4F3FF] text-[#7A5AF8]",
  orange: "bg-[#FFF4ED] text-[#F38744]",
  red: "bg-[#FEF3F2] text-[#F04438]",
  gray: "bg-gray-100 text-gray-600",
};

export function Badge({
  className,
  variant = "gray",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
