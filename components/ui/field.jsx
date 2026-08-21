import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const controlClass =
  "h-12 w-full rounded-[10px] border border-maroon/25 bg-white px-4 text-[15px] text-text-dark placeholder:text-text-dark/45 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40";

export function Field({ label, htmlFor, error, children, className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-maroon-deep">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-[#a3283f]">{error}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(controlClass, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-maroon"
        aria-hidden
      />
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(controlClass, "h-auto min-h-28 resize-none py-3", className)}
      {...props}
    />
  );
}
