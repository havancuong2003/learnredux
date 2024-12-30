import { Post } from "../models/post.model";

interface PostProps {
    postShow: Post;
    handleUpdatePost: (post: Post) => void;
    handleDeletePost: (post: Post) => void;
}

const PostComponent: React.FC<PostProps> = ({
    postShow,
    handleUpdatePost,
    handleDeletePost,
}) => {
    return (
        <div className="h-[400px] w-[300px] border border-red-500">
            <img
                src={postShow.image}
                alt={postShow.title}
                className="h-[300px] w-[300px] object-cover"
            />
            <h2>{postShow.title}</h2>
            <div className="flex justify-between">
                <button
                    onClick={() => handleUpdatePost(postShow)}
                    className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update post
                </button>
                <button
                    onClick={() => handleDeletePost(postShow)}
                    className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    delete post
                </button>
            </div>
        </div>
    );
};

export default PostComponent;
