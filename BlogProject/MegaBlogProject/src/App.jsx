import { useState, useEffect, createContext } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet, useLocation } from 'react-router-dom'

export const ThemeContext = createContext()

// Helper component to fix the "blank page" scroll issue
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()
  
  const [themeMode, setThemeMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme) // Save selection
      return newTheme
    })
  }

  useEffect(() => {
    const html = document.querySelector('html')
    html.classList.remove('light', 'dark')
    html.classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) dispatch(login({ userData }))
      else dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) return null 

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ScrollToTop />
      {/* min-h-screen + flex-col is correct */}
      <div className='min-h-screen w-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300'>
        <Header />
        
        {/* CHANGED: Added flex-1 and flex flex-col */}
        <main className='flex-1 w-full flex flex-col'>
          <Outlet key={location.pathname} />
        </main>
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App