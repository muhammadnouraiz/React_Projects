import React, { useEffect, useState } from 'react'
import authService from "../appwrite/auth"; 
import { Container } from '../components'
import { Link } from 'react-router-dom';

function Home() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        authService.getCurrentUser().then((user) => {
            if (user) {
                setCurrentUser(user);
            }
        })
    }, [])
  
    // -------------------------------------------------------------------------
    // STATE 1: LOGGED OUT
    // -------------------------------------------------------------------------
    if (!currentUser) {
        return (
            /* FIX: Added flex and min-h to push footer down and center content */
            <div className="w-full flex items-center min-h-[80vh] py-16">
                <Container>
                    <div className="flex flex-col items-start justify-center text-left">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Welcome to the <span className="text-orange-500">Blog</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
                            The place where you can share stories, lessons, and thoughts worth reading. 
                            From tech deep-dives to thought-provoking essays, explore stories that matter.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6">
                            <Link to="/signup">
                                <button className="px-10 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-orange-500/20 hover:cursor-pointer">
                                    Get Started
                                </button>
                            </Link>
                            <Link to="/login">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                                Login to read or write blogs &rarr;
                            </span>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // -------------------------------------------------------------------------
    // STATE 2: LOGGED IN
    // -------------------------------------------------------------------------
    return (
        /* FIX: Ensure logged-in state also feels spacious and pushes footer down */
        <div className='w-full flex items-center min-h-[70vh] py-8'>
            <Container>
                <div className="flex flex-col md:flex-row items-start justify-between py-10">
                    <div className="mb-6 md:mb-0 text-left">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Welcome, <span className="text-orange-500">{currentUser.name}</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8">
                            Dive into the latest stories, share your thoughts, and keep exploring articles that matter.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/all-posts">
                                <button className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg hover: cursor-pointer">
                                    See Posts
                                </button>
                            </Link>
                            <Link to="/add-post" className="text-gray-600 dark:text-gray-400 font-medium hover:text-orange-500 transition-colors">
                                Add a new post &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home