import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                {/* 1. Changed 'flex' to 'grid'
                  2. grid-cols-1 (mobile), sm:grid-cols-2 (tablet), lg:grid-cols-4 (desktop)
                  3. gap-4: This creates the exact 16px spacing between tiles
                */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        /* Removed the extra wrapper div classes because Grid handles width now */
                        <div key={post.$id} className="h-full">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts