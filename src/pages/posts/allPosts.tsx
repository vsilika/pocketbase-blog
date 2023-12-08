import {
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../App.scss";
//@ts-expect-error
import pb from '../../lib/pocketbase';
import PostCard from './components/postCard';

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any[]>([])
  
  const { isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const response = await pb
          .collection("post")
          .getFullList()
        if (response.length > 0) {
          setPosts(response)
        }
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response ?? [];
      } catch (error) {
        console.log(error)
      }
    }
  })

  
  const handleDeletePost = async (id: string) => {
    try {
      const post = await pb
      .collection("post")
      .delete(id)
    } catch (error) {
      console.log(error)
    }
  }
  
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container">
      <div>
        <h1>Blog</h1>
        <button onClick={() => navigate('/create-post')}>Create post</button>
      </div>
      <div className='post-card-container'>
        {posts?.slice().reverse().map((post: any) => {
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
        })
        }
      </div>
    </div>
  )
}

export default Posts;