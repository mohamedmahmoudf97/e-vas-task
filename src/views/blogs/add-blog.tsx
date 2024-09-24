import React from 'react';
import Modal from 'src/core/components/Modal/index';
import BlogForm from './blog-form';
import useBlogs from './useBlogs';
import { BlogFormFields } from './blogTypes';

const AddBlogModal: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({ isOpen, closeModal }):JSX.Element|null => {
    const { addBlog, loaders, errorMessage } = useBlogs({fetch: false, onAdd: () => closeModal()});
    const saveBlog = (data: BlogFormFields) => {
        addBlog(data)
    }
  return (
    <Modal isOpen={isOpen} title={'Add new blog'} toggle={closeModal}>
        {errorMessage ? <div>{errorMessage}</div> : null}
        <BlogForm save={saveBlog} saving={loaders.adding} onCancel={closeModal} />
    </Modal>
  );
};

export default AddBlogModal;
