import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300 font-medium'>
                {label}
            </label>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg outline-none duration-200 border w-full ${className}
            /* LIGHT MODE */
            bg-white text-black border-gray-200 
            focus:bg-gray-50 focus:border-orange-500
            
            /* DARK MODE (Fixed Focus State) */
            dark:bg-slate-800 dark:text-white dark:border-slate-700 
            dark:focus:bg-slate-800 dark:focus:border-orange-500`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-white text-black dark:bg-slate-800 dark:text-white">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)