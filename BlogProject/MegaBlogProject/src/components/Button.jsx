import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props  // <--- 1. You collect the props here (like onClick)...
}) {
    return (
        <button 
            type={type} // It's good practice to explicitly pass the type too
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} 
            {...props} // <--- 2. BUT YOU MUST PASS THEM HERE!
        >
            {children}
        </button>
    )
}

export default Button