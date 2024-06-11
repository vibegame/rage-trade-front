import { HTMLAttributes, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
  className?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange">;

export default function Input(props: Props) {
  const { label, inputProps, className, labelProps, ...rest } = props;

  return (
    <label className={twMerge("flex flex-col gap-1", className)}>
      {!!label && (
        <span
          {...labelProps}
          className={twMerge("text-xs text-gray-1", labelProps?.className)}
        >
          {label}
        </span>
      )}
      <input
        {...rest}
        {...inputProps}
        className={twMerge(
          "rounded-4 border border-gray-10 bg-gray-11 px-3 py-2 font-sans text-xs text-gray-1 outline-none",
          inputProps?.className
        )}
      />
    </label>
  );
}
