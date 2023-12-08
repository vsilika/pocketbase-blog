import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../App.scss";
//@ts-expect-error
import pb from '../../lib/pocketbase';
import PostCard from './components/postCard';

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const store: any = useBlogerStore()


  const getBlogs = async () => {
    try {
      const posts = await pb
        .collection("post")
        .getFullList()
      setPosts(posts)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const handleDeletePost = async (id: string) => {
    setIsLoading(true)
    try {
      const post = await pb
        .collection("post")
        .delete(id)
      getBlogs()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div>
        <h1>Blog</h1>
        <button onClick={() => navigate('/create-post')}>Create post</button>
      </div>
      <div className='post-card-container'>
        {
          isLoading ? <h1>Loading...</h1>
            : posts.slice().reverse().map((post: any) => {
              return (
                <PostCard
                  key={post.id}
                  title={post?.title}
                  author={post?.author ?? "Unknown author"}
                  subtitle={post?.subtitle}
                  blogText={post?.blogText}
                  id={post?.id}
                  onDelete={handleDeletePost}
                  onEdit={() => navigate(`/edit-post/${post?.id}`)}
                />
              )
            }
            )
        }
      </div>
    </div>
  )
}

export default Posts;