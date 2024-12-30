import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsAPI } from '../../services/post.services';
import { Post } from '../../models/post.model';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchPostsAPI(page, limit);
    return response.data; // Trả về dữ liệu từ API
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    status: 'idle',
    page: 1,
    limit: 10,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items.push(...action.payload); // Thêm bài viết vào danh sách
        state.page += 1; // Tăng số trang
        state.hasMore = action.payload.length > 0; // Kiểm tra nếu còn bài viết
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default postsSlice.reducer;
