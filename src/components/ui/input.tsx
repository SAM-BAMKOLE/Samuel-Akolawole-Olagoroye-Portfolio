import * as React from "react";
import { cn } from "@/lib/utils";

/** Underline-style fields: transparent, inherit text color (works on light and dark liquid). */
const field =
  "w-full border-0 border-b border-current/25 bg-transparent px-0 py-3.5 text-lg text-inherit outline-none transition-colors duration-300 placeholder:text-current placeholder:opacity-40 hover:border-current/50 focus:border-brand disabled:opacity-50 aria-[invalid=true]:border-destructive md:text-xl";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(field, className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(field, "min-h-[7.5rem] resize-y leading-relaxed", className)} {...props} />;
}

export { Input, Textarea };
