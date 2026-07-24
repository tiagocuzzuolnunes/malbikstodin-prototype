import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { inputVariants, type InputVariantProps } from './inputVariants'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  InputVariantProps

export function Input({ className, size = 'lg', type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}
