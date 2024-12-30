import React, { useEffect, useRef } from 'react';
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

console.log('check page', page);
const didMountRef = useRef(false); // Reference để theo dõi render lần đầu
  

useEffect(() => {
  if (didMountRef.current) return; // Đảm bảo chỉ fetch một lần khi lần đầu mount
  if (status === 'idle' && hasMore) {
    dispatch(fetchPosts({ page, limit: 10 }));
  }
  console.log('check');
  
  didMountRef.current = true; // Đánh dấu đã mount và gọi API
}, [dispatch, status, page, hasMore]);

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
