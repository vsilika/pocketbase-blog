import { useEffect, useState } from 'react'
//@ts-expect-error
import pb from '../../lib/pocketbase';
import { useNavigate, useParams } from 'react-router-dom';


const EditPosts = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedPost, setSelectedPost] = useState<any>({})
  const [title, setTitle] = useState<string>(selectedPost?.title ?? "")
  const [subtitle, setSubtitle] = useState<string>(selectedPost?.subtitle ?? "")
  const [blogText, setBlogText] = useState<string>(selectedPost?.blogText ?? "")


  const getPost = async () => {
    try {
      const post = await await pb.collection('post').getOne(id)
      setSelectedPost(post)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!id) return
    getPost()
  }, [])

  useEffect(() => {
    setTitle(selectedPost?.title ?? "");
    setSubtitle(selectedPost?.subtitle ?? "");
    setBlogText(selectedPost?.blogText ?? "");
  }, [selectedPost])


  const postData = {
    title: title ?? "",
    subtitle: subtitle ?? "",
    blogText: blogText ?? "",
  }


  const handleEditPost = async (e: any) => {
    e.preventDefault()
    try {
      await pb.collection('post').update(id, postData);
      setTimeout(() => {
        navigate('/posts')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-edit-post container">
      <h1>Edit post</h1>
      <input
        type="text"
        value={title}
        onBlur={(e) => setTitle(e.target.value)}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={subtitle}
        onBlur={(e) => setSubtitle(e.target.value)}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtitle"
      />
      <textarea name="" id=""
        value={blogText}
        onBlur={(e) => setBlogText(e.target.value)}
        onChange={(e) => setBlogText(e.target.value)}
        placeholder={postData.blogText}
        rows={30}
        style={{ resize: 'none', overflowY: 'scroll' }}
      />
      <button onClick={handleEditPost}>edit post</button>
      <button onClick={() => navigate('/posts')}>
        BACK
      </button>
    </div>
  )
}

export default EditPosts;