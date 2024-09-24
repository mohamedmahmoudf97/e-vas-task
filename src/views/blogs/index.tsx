import React, { useEffect, useState } from 'react';
import useBlogs from './useBlogs';
import { Blog } from './blogTypes';
import FallBackSpinner from '../components/Spinner';
import AddBlogModal from './add-blog';
import EditBlogModal from './edit-blog';
import WarningModal from '../components/DeleteWarning';
import PageHeader from 'src/core/components/PageHeader';
import BlogCard from './BlogCard';
import { useInView } from 'react-intersection-observer';

const BlogList = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedBlogToDelete, setSelectedBlogToDelete] = useState<Blog | null>(null);

  const { 
    blogs, 
    isError, 
    error, 
    deleteBlog, 
    setSearchValue, 
    searchValue, 
    fetchNextPage, 
    hasNextPage, 
    loaders,
  } = useBlogs({
    fetch: true,
    onAdd: () => setAddModalOpen(false),      
    onUpdate: () => setEditModalOpen(false),  
    onDelete: () => setDeleteModalOpen(false) 
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (blog: Blog) => {
    setSelectedBlogToDelete(blog);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);
  if (loaders.listing) return <FallBackSpinner />;
  if (isError) return <span>Error: {error?.message}</span>;

  return (
    <div>
      <PageHeader 
        title="Blogs" 
        action={
          <button
            onClick={openAddModal}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Blog
          </button>
        } 
      />
      
      <input
        className="mt-1 px-3 py-2 border shadow-sm border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search"
        onChange={e => setSearchValue(e.target.value)}
      />
      
      {selectedBlogToDelete && (
        <WarningModal 
          isOpen={isDeleteModalOpen} 
          toggle={closeDeleteModal} 
          onDelete={() => deleteBlog(selectedBlogToDelete.id)} 
        />
      )}
      
      {selectedBlog && (
        <EditBlogModal 
          isOpen={isEditModalOpen} 
          closeModal={closeEditModal} 
          blog={selectedBlog} 
        />
      )}

      <AddBlogModal isOpen={isAddModalOpen} closeModal={closeAddModal} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {blogs.map((blog: Blog) => (
          <BlogCard 
            key={blog.id} 
            searchValue={searchValue}
            blog={blog} 
            openDeleteModal={() => openDeleteModal(blog)} 
            openEditModal={() => openEditModal(blog)} 
          />
        ))}
      </div>
      
      {loaders.isFetchingNextPage && <FallBackSpinner />}
      
      <div ref={ref} style={{ height: 20 }}></div>
    </div>
  );
};

export default BlogList;
