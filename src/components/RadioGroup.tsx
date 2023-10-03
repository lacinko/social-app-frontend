import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

export interface RadioGroupProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  className?: string;
  children: React.ReactNode;
}

export const RadioGroup = forwardRef(function MyRadioGroup(
  { className, children, ...props }: RadioGroupProps,
  ref: React.ForwardedRef<HTMLFieldSetElement>
) {
  return (
    <fieldset className={cn("grid gap-2", className)} ref={ref} {...props}>
      {children}
    </fieldset>
  );
});

export default RadioGroup;

export interface RadioItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  register: UseFormRegister<any>;
}

export const RadioItem = forwardRef(function MyRadioItem(
  { name, rules, register, className, ...props }: RadioItemProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  if (ref) {
    return (
      <input
        type="radio"
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...register(name, rules)}
        ref={ref}
        {...props}
      />
    );
  }
  return (
    <input
      type="radio"
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      {...register(name, rules)}
    />
  );
});
