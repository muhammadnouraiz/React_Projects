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
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
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

  if (loading) return null // Or a loading spinner

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ScrollToTop />
      <div className='min-h-screen w-full flex flex-col'>
        <Header />
        
        <main className='grow w-full'>
          {/* Key forces React to re-render the page content on navigation */}
          <Outlet key={location.pathname} />
        </main>
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App