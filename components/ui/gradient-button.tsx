import React from 'react';
import { cn } from '@/lib/utils';
import { GRADIENT_CLASSES, getComponentGradient } from '@/lib/gradients';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, disabled, ...props }, ref) => {
    // Mapping des variantes vers les dégradés
    const getGradientClass = (variant: string) => {
      switch (variant) {
        case 'primary':
          return GRADIENT_CLASSES.PRIMARY_RED_BLUE;
        case 'secondary':
          return 'bg-gradient-to-r from-blue-700 to-gray-500';
        case 'accent':
          return GRADIENT_CLASSES.PRIMARY_RED_GREEN;
        case 'success':
          return GRADIENT_CLASSES.SECONDARY_BLUE_GREEN;
        case 'warning':
          return GRADIENT_CLASSES.SECONDARY_RED_ORANGE;
        default:
          return GRADIENT_CLASSES.PRIMARY_RED_BLUE;
      }
    };

    // Mapping des tailles
    const getSizeClass = (size: string) => {
      switch (size) {
        case 'sm':
          return 'px-3 py-1.5 text-sm';
        case 'md':
          return 'px-4 py-2 text-base';
        case 'lg':
          return 'px-6 py-3 text-lg';
        default:
          return 'px-4 py-2 text-base';
      }
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
      'gradient-hover',
      getSizeClass(size),
      disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    const gradientClass = getGradientClass(variant);

    return (
      <button
        ref={ref}
        className={cn(baseClasses, gradientClass)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export { GradientButton };
