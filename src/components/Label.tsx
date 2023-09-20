import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type LabelProps = {
  children: React.ReactNode;
  error?: boolean;
  htmlFor?: string;
  className?: string;
};

const Label = forwardRef(function Label(
  { children, error, htmlFor, className, ...props }: LabelProps,
  ref: React.ForwardedRef<HTMLLabelElement>
) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
        error && "text-destructive"
      )}
      htmlFor={htmlFor}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
});

export default Label;
