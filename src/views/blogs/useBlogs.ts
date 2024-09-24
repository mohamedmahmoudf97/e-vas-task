import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../axios/instance";
import { Blog, BlogFormFields } from "./blogTypes";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";


interface UseBlogsOptions {
  fetch: boolean;
  onAdd?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
} 

const fetchBlogsRequest = async ({ pageParam = 1 }) => {
  const { data } = await axiosInstance.get<Blog[]>(`/posts?_page=${pageParam}&_limit=10`);
  return data;
};

const addBlogRequest = async (blog: BlogFormFields) => {
  const { data } = await axiosInstance.post<Blog>(`/posts`, blog);
  return data;
};

const updateBlogRequest = async (blog: BlogFormFields) => {
  const { data } = await axiosInstance.put<Blog>(`/posts/${blog.id}`, blog);
  return data;
};

const deleteBlogRequest = async (id: number) => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
};

const useBlogs = (options: UseBlogsOptions) => {
  const queryClient = useQueryClient();

  const [adding, setAdding] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogsRequest,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined; // No more pages
      return allPages.length + 1; // Next page
    },
    enabled: options.fetch,
    retry: 3,
  });

  const blogs = useMemo(() => data?.pages.flat() || [], [data]);

  // Add Blog Mutation
  const addBlog = useMutation({
    mutationFn: addBlogRequest,
    onMutate: () => {
      setAdding(true);
    },
    onError: () => {
      setErrorMessage("Failed to add this blog, please try again later!");
      setAdding(false);
    },
    onSuccess: (newBlog) => {
      setAdding(false);
      queryClient.setQueryData(["blogs"], (prevData: any) => {
        if (!prevData) return { pages: [[newBlog]], pageParams: [1] };
        return {
          ...prevData,
          pages: [[newBlog, ...prevData.pages[0]], ...prevData.pages.slice(1)],
        };
      });
      options.onAdd?.();
      toast.success("Blog added successfully")
    },
  });

  // Update Blog Mutation
  const updateBlog = useMutation({
    mutationFn: updateBlogRequest,
    onMutate: (blog: BlogFormFields) => {
      setUpdating(true);
    },
    onError: () => {
      setErrorMessage("Failed to update this blog, please try again later!");
      setUpdating(false);
    },
    onSuccess: (updatedBlog) => {
        toast.success("Blog update successfully")
        options.onUpdate?.(); 
        setUpdating(false);
        queryClient.setQueryData(["blogs"], (prevData: any) => {
            if (!prevData) return prevData;
            return {
            ...prevData,
            pages: prevData.pages.map((page: Blog[]) =>
                page.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
            ),
            };
        });
    }
  });

  // Delete Blog Mutation
  const deleteBlog = useMutation({
    mutationFn: deleteBlogRequest,
    onMutate: (id: number) => {
      setDeleting(true);
    },
    onError: () => {
      setErrorMessage("Failed to delete this blog, please try again later!");
      setDeleting(false);
    },
    onSuccess: (_, id) => {
      setDeleting(false);
      queryClient.setQueryData(["blogs"], (prevData: any) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          pages: prevData.pages.map((page: Blog[]) => page.filter((blog) => blog.id !== id)),
        };
      });
      toast.success("Blog removed successfully")
      options.onDelete?.(); 
    },
  });

  const filterBlogs = useCallback(
    (blogs: Blog[], query: string) => {
      const needle = query?.toLowerCase();
      return blogs?.filter(
        (blog) =>
          blog.title.toLowerCase().includes(needle) ||
          blog.body.toLowerCase().includes(needle) ||
          blog.id.toString().includes(needle)
      );
    },
    []
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredData = useMemo(() => filterBlogs(blogs || [], searchValue), [
    searchValue,
    filterBlogs,
  ]);

  return {
    blogs: searchValue ? filteredData : blogs || [],
    isError,
    error,
    addBlog: addBlog.mutate,
    updateBlog: updateBlog.mutate,
    deleteBlog: deleteBlog.mutate,
    loaders: {
      listing: isLoading,
      isFetchingNextPage,
      adding,
      updating,
      deleting,
    },
    errorMessage,
    searchValue,
    setSearchValue,
    fetchNextPage,
    hasNextPage,
  };
};

export default useBlogs;
