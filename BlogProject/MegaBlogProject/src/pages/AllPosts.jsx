import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import authService from "../appwrite/auth"
import { Query } from 'appwrite'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [view, setView] = useState("public") 
    const [user, setUser] = useState(null)

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) setUser(userData)
        })
    }, [])

    useEffect(() => {
        if (view === "public") {
            appwriteService.getPosts().then((res) => {
                if (res) setPosts(res.documents)
            })
        } else if (view === "myPosts" && user) {
            appwriteService.getPosts([Query.equal("userId", user.$id)]).then((res) => {
                if (res) setPosts(res.documents)
            })
        }
    }, [view, user])

    return (
        <div className='w-full py-8'>
            <Container>
                {/* --- ANIMATED TOGGLE --- */}
                <div className="flex justify-center mb-12">
                    <div className="relative bg-gray-200 dark:bg-slate-800 p-1 rounded-full flex items-center w-72 h-12 shadow-inner">
                        {/* The Sliding Background */}
                        <div 
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg ${view === 'public' ? 'left-1' : 'left-[calc(50%+1px)]'}`}
                        ></div>
                        
                        <button 
                            onClick={() => setView("public")}
                            className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${view === 'public' ? 'text-white' : 'text-gray-500 hover:text-orange-400 hover:cursor-pointer'}`}
                        >
                            Public Feed
                        </button>
                        <button 
                            onClick={() => setView("myPosts")}
                            className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${view === 'myPosts' ? 'text-white' : 'text-gray-500 hover:text-orange-400 hover:cursor-pointer'}`}
                        >
                            My Posts & Drafts
                        </button>
                    </div>
                </div>

                {/* --- POSTS GRID --- */}
                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800">
                        <h2 className="text-xl font-medium text-gray-400">No posts found in this section.</h2>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className="group relative h-full">
                                
                                {/* --- PREMIUM DRAFT BADGE --- */}
                                {post.status === 'inactive' && (
                                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full shadow-xl animate-in fade-in zoom-in duration-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                        <span className="text-[10px] font-black tracking-widest text-white uppercase italic">Draft</span>
                                    </div>
                                )}
                                
                                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                                    <PostCard {...post} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts