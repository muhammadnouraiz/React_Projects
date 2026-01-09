import React from 'react'
import logoImg from '../assets/logo.png' 

function Logo({ width = '100px', className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Oren Logo" 
        style={{ width: width }} 
        className="object-contain"
      />
    </div>
  )
}

export default Logo