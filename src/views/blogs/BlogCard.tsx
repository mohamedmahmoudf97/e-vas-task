import React from 'react';
import { Blog } from './blogTypes';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
  openEditModal: (blog: Blog) => void,
  openDeleteModal: (blog: Blog) => void
  searchValue: string|null
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, openEditModal, openDeleteModal, searchValue }) => {
    const highlightText = (text: string) => {
        if (!searchValue) return text; 
        const lowerText = text.toLowerCase();
        const lowerQuery = searchValue.toLowerCase();
        const startIndex = lowerText.indexOf(lowerQuery);

        if (startIndex === -1) return text; 

        const beforeMatch = text.slice(0, startIndex);
        const match = text.slice(startIndex, startIndex + searchValue.length);
        const afterMatch = text.slice(startIndex + searchValue.length);

        return (
            <>
            {beforeMatch}
            <span style={{ backgroundColor: 'yellow' }}>{match}</span> 
            {afterMatch}
            </>
        );
        };
    
    return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 border border-gray-300">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">{highlightText(blog.title)}</h2>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600" onClick={() => openEditModal(blog)}>
                Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600" onClick={() => openDeleteModal(blog)}>
                Delete
                </button>
            </div>
        </div>
      <p className="text-gray-700 mb-4">{highlightText(blog.body.substring(0, 300))}</p>
        <Link href={`/${blog.id}`} >See more</Link>
    </div>
  );
};

export default BlogCard;
