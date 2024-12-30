import { Post } from "../models/post.model"

interface PostProps {
    postShow: Post
}

const PostComponent : React.FC<PostProps> = ({postShow}) => {
  return (
    <div className='h-[400px] w-[300px] border border-red-500'>
        <img src={postShow.image} alt={postShow.title} className="h-[300px] w-[300px] object-cover" />
        <h2>{postShow.title}</h2>

    </div>
  )
}

export default PostComponent