import React,{useId} from 'react'

const Input = React.forwardRef( function Input({  // using forwardRef to pass ref to input element
    label,
    type = '',
    className = '',
    ...props
}, ref){
     const id = useId()
    return( 
        <div className='w-full'>
            {label && <label              // if label exists, render label element 
            htmlFor={id}                  // associate label with input using id
            className='block text-gray-700 font-medium mb-2'>
                {label}
            </label>
            }
            <input 
            type={type} // it overrides any type in props
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} `}
            ref={ref} // forwarding the ref to the input element
            id={id}
             {...props} 
             />
        </div>
    )
}) 

export default Input