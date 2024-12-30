// post.services.ts
import { posts } from "../datas/data"; // import dữ liệu mock
import { Post } from "../models/post.model";

// Hàm fetch dữ liệu từ API giả lập
export const fetchPostsAPI = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  return new Promise<{ data: Post[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: posts.slice(startIndex, startIndex + limit) });
    }, 500); // Giả lập thời gian gọi API
  });
};
