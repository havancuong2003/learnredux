import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { useInfiniteScroll } from '../hooks/infinitiScroll';
import { RootState } from '../store';
import { AppDispatch } from '../store'; // Import AppDispatch từ store
import PostComponent from '../components/post';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Sử dụng AppDispatch
  const { items, page, limit, hasMore, status } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ page, limit })); // Gọi dispatch đúng cách
  }, [dispatch, page, limit]);

  const loadMore = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchPosts({ page, limit }));
    }
  };

  useInfiniteScroll(loadMore);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="posts-list grid grid-cols-3 gap-4">
        {items.map((post) => (
         <PostComponent key={post.id} postShow={post} />
        ))}
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {!hasMore && <p>No more posts!</p>}
    </div>
  );
};

export default Home;
