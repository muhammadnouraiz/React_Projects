import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Image Container */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
                    <img
                        // FIXED: Typo corrected from getFilePerview to getFilePreview
                        src={appwriteService.getFilePreview(post.featuredImage)} 
                        alt={post.title}
                        className="rounded-xl w-full h-auto" 
                    />

                    {/* Buttons positioned bottom-right */}
                    {isAuthor && (
                        <div className="absolute bottom-6 right-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-orange-500 hover:bg-orange-600 shadow-lg" className="mr-3">
                                    Edit Post
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700 shadow-lg" onClick={deletePost}>
                                Delete Post
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {post.title}
                    </h1>
                </div>

                {/* Post Content */}
                <div className="browser-css text-gray-700 dark:text-gray-300">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}