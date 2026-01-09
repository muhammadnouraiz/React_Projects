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
    // STATE 1: LOGGED OUT (Layout matches image, Color is Orange)
    // -------------------------------------------------------------------------
    if (!currentUser) {
        return (
            <div className="w-full py-16 mt-4">
                <Container>
                    <div className="flex flex-col items-start justify-center min-h-[50vh] text-left">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Welcome to the <span className="text-orange-500">Blog</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
                            The place where you can share stories, lessons, and thoughts worth reading. 
                            From tech deep-dives to thought-provoking essays, explore stories that matter.
                        </p>
                        
                        <div className="flex items-center gap-6">
                            <Link to="/login">
                                <button className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg">
                                    Get Started
                                </button>
                            </Link>
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                                Login to read or write blogs &rarr;
                            </span>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // -------------------------------------------------------------------------
    // STATE 2: LOGGED IN (Layout matches image, Color is Orange)
    // -------------------------------------------------------------------------
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-col md:flex-row items-start justify-between py-10">
                    <div className="mb-6 md:mb-0 text-left">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Welcome, <span className="text-orange-500">{currentUser.name}</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-6">
                            Dive into the latest stories, share your thoughts, and keep exploring articles that matter.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/all-posts">
                                <button className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg">
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