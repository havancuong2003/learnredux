import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addPosts,
    deletePost,
    fetchPosts,
    resetPosts,
    updatePost,
} from "../features/posts/postsSlice";
import { useInfiniteScroll } from "../hooks/infinitiScroll";
import { RootState } from "../store";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import PostComponent from "../components/post";
import Loading from "../components/loading";
import { Post } from "../models/post.model";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Sử dụng AppDispatch
    const { items, page, limit, hasMore, status } = useSelector(
        (state: RootState) => state.posts
    );

    console.log("check page", page);
    const didMountRef = useRef(false); // Reference để theo dõi render lần đầu

    useEffect(() => {
        if (didMountRef.current) return; // Đảm bảo chỉ fetch một lần khi lần đầu mount
        if (status === "idle" && hasMore) {
            dispatch(fetchPosts({ page, limit: 10 }));
        }
        console.log("check");

        didMountRef.current = true; // Đánh dấu đã mount và gọi API
    }, [dispatch, status, page, hasMore]);

    const loadMore = () => {
        if (status !== "loading" && hasMore) {
            dispatch(fetchPosts({ page, limit }));
        }
    };

    useInfiniteScroll(loadMore);

    const handleRefresh = () => {
        dispatch(resetPosts()); // Reset state trước khi gọi API mới
        dispatch(fetchPosts({ page: 1, limit: 10 })); // Gọi API với page = 1 và limit = 10
    };
    const handleAddPost = () => {
        dispatch(
            addPosts({
                id: 111,
                title: "Post 111",
                image: "https://i.pinimg.com/originals/bf/9f/87/bf9f87cab07ae674f3c426fa5dbb3804.jpg",
            })
        ); // Gọi API với page = 1 và limit = 10
    };

    const handleUpdatePost = (post: Post) => {
        dispatch(
            updatePost({
                id: post.id,
                title: "Updated Title",
                image: post.image,
            })
        );
    };
    const handleDeletePost = (post: Post) => {
        dispatch(deletePost(post.id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button
                className="fixed top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRefresh}
            >
                Refresh
            </button>
            <button
                className="fixed top-0 left-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddPost}
            >
                add post
            </button>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div className="posts-list grid grid-cols-3 gap-4">
                {items.map((post) => (
                    <PostComponent
                        key={post.id}
                        postShow={post}
                        handleUpdatePost={() => handleUpdatePost(post)}
                        handleDeletePost={() => handleDeletePost(post)}
                    />
                ))}
            </div>
            {status === "loading" && <Loading />}
            {!hasMore && (
                <div className="flex items-center justify-center h-24">
                    <p className="text-lg font-semibold text-gray-500 italic">
                        No more posts to show!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;
