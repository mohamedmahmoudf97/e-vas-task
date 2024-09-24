import CloseButton from "src/core/components/Modal/CloseButton";
import ModalHeader from "src/core/components/Modal/ModalHeader";
import BlogForm from "./blog-form";
import useBlogs from "./useBlogs";
import { Blog, BlogFormFields } from "./blogTypes";
import Modal from "src/core/components/Modal";

const EditBlogModal: React.FC<{ isOpen: boolean; closeModal: () => void, blog: Blog }> = ({ isOpen, closeModal, blog }) => {
    
  const { updateBlog,loaders, errorMessage } = useBlogs({fetch: false, onUpdate: () => closeModal()});
  const saveBlog = (data: BlogFormFields) => {
    updateBlog(data)
  }
return (
  <Modal isOpen={isOpen} title={'Edit blog'} toggle={closeModal}>
        {errorMessage ? <div className="bg-red-200 rounded px-1">{errorMessage}</div> : null}

      <BlogForm save={saveBlog} blog={blog} saving={loaders.updating} onCancel={closeModal} />
  </Modal>
);

};

export default EditBlogModal