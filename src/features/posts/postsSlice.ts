import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostsAPI } from "../../services/post.services";
import { Post } from "../../models/post.model";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await fetchPostsAPI(page, limit);
        return response.data; // Trả về dữ liệu từ API
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        items: [] as Post[],
        status: "idle",
        page: 1,
        limit: 10,
        hasMore: true,
    },
    reducers: {
        resetPosts(state) {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
            state.status = "idle";
        },
        // Thêm bài viết vào danh sách
        addPosts(state, action) {
            state.items.unshift(action.payload); // Thêm vào đầu mảng
        },
        updatePost(state, action) {
            const { id, title, image } = action.payload;
            const existingPost = state.items.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.image = image;
            }
            return state;
        },
        deletePost(state, action) {
            const postId = action.payload;
            state.items = state.items.filter((post) => post.id !== postId);
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading"; // Chỉ thay đổi status nếu chưa đang tải hoặc đã tải thất bại
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                if (action.payload.length > 0) {
                    state.items.push(...action.payload); // Thêm bài viết vào danh sách
                    state.page += 1; // Tăng số trang
                    state.hasMore = action.payload.length === state.limit; // Kiểm tra nếu còn bài viết
                } else {
                    state.hasMore = false; // Nếu không có bài viết, không cần gọi API thêm nữa
                }
                state.status = "succeeded";
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { resetPosts, addPosts, updatePost, deletePost } =
    postsSlice.actions; // Export action resetPosts

export default postsSlice.reducer;
