import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="block group h-full transition-transform duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className='w-full overflow-hidden rounded-2xl shadow-sm mb-4 bg-gray-100 dark:bg-slate-800'>
            <img
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title}
                className='w-full h-auto' 
            />
        </div>

        {/* Title text */}
        <h2 className='text-xl font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors duration-200'>
            {title}
        </h2>
    </Link>
  )
}

export default PostCard