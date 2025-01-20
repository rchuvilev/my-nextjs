import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, any>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return <Comp ref={ref} {...props} />;
	},
);
Button.displayName = 'Button';
