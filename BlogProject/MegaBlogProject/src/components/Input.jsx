import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300 font-medium' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input 
            type={type} 
            className={`px-3 py-2 rounded-lg outline-none duration-200 border w-full ${className}
            
            /* LIGHT MODE STYLES */
            bg-white text-black border-gray-200 
            focus:bg-gray-50 focus:border-orange-500
            
            /* DARK MODE STYLES */
            dark:bg-slate-800 dark:text-white dark:border-slate-700 
            dark:focus:bg-slate-800 dark:focus:border-orange-500`}
            
            ref = {ref}
            {...props}
            id= {id}
            />
        </div>
    )
})
export default Input