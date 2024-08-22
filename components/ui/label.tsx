import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        ref={ref}
        className={cn(
          "block text-sm font-medium text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Label };
