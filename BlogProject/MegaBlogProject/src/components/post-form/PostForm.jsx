import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Get userData from Redux
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const watchImage = watch("image");

    const submit = async (data) => {
        setLoading(true);
        
        try {
            // 1. CRITICAL CHECK: Ensure we have a real user ID
            // If Redux is empty, we try to grab it from the post or alert
            const userId = userData?.$id || post?.userId;
            
            if (!userId) {
                alert("Session Error: Please log out and log back in to refresh your account.");
                setLoading(false);
                return;
            }

            if (post) {
                // UPDATE POST
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
                
            } else {
                // CREATE POST
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        userId: userId // Using the verified ID
                    });

                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Appwrite Error:", error);
            alert("Submission Failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
        const transformedSlug = value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

        // Limit the slug to 25 characters
        return transformedSlug.length > 25 
            ? transformedSlug.substring(0, 25) 
            : transformedSlug;
    }
    return "";
}, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-full md:w-1/3 px-2">
                <div className="mb-4">
                    <label className="inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300 font-medium">
                        Featured Image :
                    </label>
                    <div className="relative w-full">
                        <div className="px-3 py-2 rounded-lg border w-full flex items-center overflow-hidden bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                            <span className="truncate block w-full text-gray-500">
                                {watchImage && watchImage.length > 0 ? watchImage[0].name : "Choose File..."}
                            </span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>
                </div>

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}
                
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 hover:cursor-pointer"
                    {...register("status", { required: true })}
                />
                
                <Button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600 hover:cursor-pointer"}`}
                >
                    {loading ? "Uploading..." : (post ? "Update" : "Submit")}
                </Button>

                {/* Validation Helper */}
                {Object.keys(errors).length > 0 && (
                    <p className="text-red-500 text-xs mt-2 text-center font-bold italic">
                        Missing: {Object.keys(errors).join(", ")}
                    </p>
                )}
            </div>
        </form>
    );
}