import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  borderWidth?: string
  bgColor?: string
  borderColor?: string
  textColor?: string
  hoverBgColor?: string
  hoverTextColor?: string
  variant?: 'solid' | 'outline' | 'ghost'
  radius?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  borderWidth = 'border-2',
  bgColor = 'bg-[#7c3bec]',
  borderColor = 'border-violet-600',
  textColor = 'text-white',
  hoverBgColor = 'hover:bg-violet-700',
  hoverTextColor = 'hover:text-white',
  variant = 'solid',
  radius = 'rounded-lg',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  // Size variants
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-2 text-lg',
    xl: 'px-10 py-3 text-xl',
  }

  // Variant styles
  const variantClasses: Record<'solid' | 'outline' | 'ghost', string> = {
    solid: `${bgColor} ${borderWidth} ${borderColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${radius}`,
    outline: `bg-transparent ${textColor} ${borderWidth} ${borderColor} ${hoverBgColor} ${hoverTextColor} ${radius}`,
    ghost: `bg-transparent ${textColor} ${hoverBgColor} ${hoverTextColor} ${radius}`,
  }

  // Base classes
  const baseClasses =
    'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'

  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${className}
  `.trim()

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
