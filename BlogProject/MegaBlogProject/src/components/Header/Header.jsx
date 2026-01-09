import React, { useState } from 'react'
import { Container, Logo, LogoutBtn, ThemeBtn } from '../index' 
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "/add-post", active: authStatus },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    /* Added 'w-full' to ensure it spans the width and confirmed 'sticky top-0 z-50' */
    <header className='w-full py-3 shadow bg-gray-50 dark:bg-gray-900 sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* 1. LEFT: Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>

          {/* 2. DESKTOP NAVIGATION (Visible on md and larger) */}
          <ul className='hidden md:flex ml-auto items-center space-x-6'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 
                      ${location.pathname === item.slug 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-gray-900 dark:text-gray-100 hover:text-orange-500'
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
            {/* Theme Toggle Button */}
            <li>
                <ThemeBtn />
            </li>

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="px-4 py-2 rounded-full font-bold text-gray-900 dark:text-gray-100 hover:text-orange-500 transition-colors" />
              </li>
            )}
          </ul>

          {/* 3. MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 border-2 border-gray-800 dark:border-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none z-50 relative"
          >
             <div className="relative w-6 h-6">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                    className={`w-6 h-6 text-gray-900 dark:text-white absolute transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                    className={`w-6 h-6 text-gray-900 dark:text-white absolute transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </div>
          </button>

          {/* 4. MOBILE SIDEBAR */}
          <div className={`md:hidden fixed inset-0 z-40 flex justify-end ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              
              <div 
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeMenu}
              ></div>

              <div 
                className={`relative w-72 h-full bg-gray-50 dark:bg-gray-900 shadow-2xl p-6 flex flex-col items-center overflow-y-auto transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
              >
                <div className="mt-12 w-full flex flex-col items-center space-y-8">
                    <div className="mb-4">
                        <Logo width="120px" />
                    </div>

                    <ul className='flex flex-col items-center space-y-4 w-full text-center'>
                    {navItems.map((item) => 
                        item.active ? (
                        <li key={item.name} className="w-full">
                            <button
                            onClick={() => {
                                navigate(item.slug)
                                closeMenu()
                            }}
                            className={`w-full px-6 py-3 rounded-full text-lg font-bold transition-all duration-200 
                                ${location.pathname === item.slug 
                                    ? 'bg-orange-500 text-white shadow-md' 
                                    : 'text-gray-900 dark:text-gray-100 hover:text-orange-500' 
                                }`}
                            >
                            {item.name}
                            </button>
                        </li>
                        ) : null
                    )}
                    
                    {/* Theme Btn for Mobile */}
                    <li className="w-full flex justify-center mt-2">
                        <ThemeBtn />
                    </li>
                    
                    {authStatus && (
                        <li className="w-full mt-4">
                            <div onClick={closeMenu}>
                                <LogoutBtn className="w-full px-6 py-3 rounded-full text-lg font-bold text-gray-900 dark:text-white hover:text-orange-500 transition-colors" />
                            </div>
                        </li>
                    )}
                    </ul>
                </div>
              </div>
          </div>

        </nav>
      </Container>
    </header>
  )
}

export default Header