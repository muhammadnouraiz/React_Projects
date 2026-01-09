import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = "" }) {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1 text-gray-700 dark:text-gray-300 font-medium'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        key={isDarkMode ? 'dark-editor' : 'light-editor'}
                        apiKey='7iqay8n5pc99l7hrbgdpa0llcisg7u9w81wlexbcxk464utm'
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            skin: isDarkMode ? "oxide-dark" : "oxide",
                            content_css: isDarkMode ? "dark" : "default",
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap",
                                "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                                "insertdatetime", "media", "table", "help", "wordcount"
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: isDarkMode 
                                ? `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #0f172a; color: #f1f5f9; }`
                                : `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #ffffff; color: #000000; }`
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}