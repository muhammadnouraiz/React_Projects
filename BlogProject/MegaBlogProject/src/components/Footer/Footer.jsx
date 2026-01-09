import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
            
            {/* Main Container: Stack vertically on Mobile, Row on Desktop */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                
                {/* 1. LOGO (Top Center on Mobile, Left on Desktop) */}
                <div className="mb-4 inline-flex items-center">
                    <Logo width="150px" />
                </div>

                {/* 2. LINKS CONTAINER (Center on Mobile, Right on Desktop) */}
                <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-center md:justify-end gap-8 md:gap-16 text-center md:text-left">
                    
                    {/* Column 1: COMPANY */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Features</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Pricing</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Affiliate Program</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: SUPPORT */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Account</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Help</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Customer Support</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: LEGALS (Added) */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Legals
                        </h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/" className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors">Licensing</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. COPYRIGHT (Bottom Center) */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    &copy; Copyright 2026. Build with 🍵 by Muhammad Nouraiz.
                </p>
            </div>
        </div>
    </section>
  )
}

export default Footer