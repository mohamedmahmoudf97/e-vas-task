import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios/instance";
import { Blog } from "./blogTypes";

const getBlogRequest = async (id: number) => {
  const { data } = await axiosInstance.get<Blog>(`/posts/${id}`);
  return data;
};

const useBlog = (id: number) => {
  return useQuery({
    queryKey: ['blog'],
    queryFn: () => getBlogRequest(id),
    retry: 3
  });
};

export default useBlog;
