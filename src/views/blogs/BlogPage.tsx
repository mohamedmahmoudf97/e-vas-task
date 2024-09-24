import { useRouter } from 'next/router';
import useBlog from './useBlog';
import FallBackSpinner from '../components/Spinner';
import PageHeader from 'src/core/components/PageHeader';

const ShowBlog = () => {
  const router = useRouter();
  const { blogId } = router.query;

  const { data: blog, isLoading, isError, error } = useBlog(Number(blogId));  // Convert id to number

  if (isLoading) return <FallBackSpinner />;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  return (
    <div className="p-4">
        <PageHeader title='Blog details' />
      <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
      <p className="text-gray-600 mb-6">{blog?.body}</p>

    </div>
  );
};

export default ShowBlog;
