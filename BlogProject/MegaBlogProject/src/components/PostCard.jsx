import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    /* Restored your original float effect: transition-transform hover:-translate-y-1 */
    <Link to={`/post/${$id}`} className="block group h-full transition-transform duration-300 hover:-translate-y-1">
        
        {/* Fixed Aspect Ratio to keep the grid tight and aligned */}
        <div className='w-full aspect-16/10 overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 mb-3 shadow-sm'>
            <img
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title}
                /* Use object-cover so all images are the same height in the grid */
                className='w-full h-full object-cover' 
            />
        </div>

        {/* Title text with line-clamping to keep row heights identical */}
        <h2 className='text-lg font-bold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2'>
            {title}
        </h2>
    </Link>
  )
}

export default PostCard