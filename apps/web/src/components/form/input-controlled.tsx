"use client";

import { type ChangeEvent, forwardRef, useCallback } from "react";

import { type ControllerRenderProps, type FieldValues, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;


export interface InputControlledProps extends InputProps {
  name: string;
  label?: string;
  description?: string;
  labelClassName?: string;
}

export const InputControlled = ({
  name,
  label,
  description,
  labelClassName,
  className,
  ...props
}: InputControlledProps) => {
  const { control } = useFormContext();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FieldValues, string>) => {
      return props.type === "number"
        ? field?.onChange?.(+e.target.value)
        : field?.onChange?.(e.target.value);
    },
    [],
  );

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(className, 'flex flex-col gap-0', "w-full")}>
          <FormLabel className={labelClassName}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              type={props.type ?? "text"}
              onChange={e => handleChange(e, field)}
            />
          </FormControl>
          <FormMessage />
          {description ? <FormDescription>{description}</FormDescription> : null}
        </FormItem>
      )}
    />
  );
};
