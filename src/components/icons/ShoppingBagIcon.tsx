import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function ShoppingBagIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Sleek, clean trapezoid/rectangular bag body */}
      <path d="M5 9h14l1 11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L5 9z" />
      {/* Elegant curved handle */}
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
