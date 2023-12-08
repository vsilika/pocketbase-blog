import { useEffect, useState } from 'react'
//@ts-expect-error
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import { useBlogerStore } from '../../store';


const CreatePosts = () => {
  const navigate = useNavigate()
  const store : any = useBlogerStore()
  const [title, setTitle] = useState<string>("")
  const [subtitle, setSubtitle] = useState<string>("")
  const [blogText, setBlogText] = useState<string>("")


  const handleCratePost = async (e: any) => {
    e.preventDefault()
    try {
      const post = await pb
        .collection("post")
        .create({
          title: title,
          subtitle: subtitle,
          blogText: blogText,
          author: store.accountData?.record?.name
        })
      setTimeout(() => {
        navigate('/posts')
      }, 2000)

    } catch (error) {
      console.log(error)
    }
  }

  const isPostValid = () => {
    return title !== "" && subtitle !== "" && blogText !== ""
  }

  useEffect(() => {
    isPostValid()
  }, [title, subtitle, blogText])

  return (
    <div className="create-edit-post container">
      <h1>Create post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtitle"
      />
      <textarea name="" id=""
        value={blogText}
        onChange={(e) => setBlogText(e.target.value)}
        placeholder="Blog text"
        rows={30}
        style={{ resize: 'none', overflowY: 'scroll' }}
      />
      <button
        onClick={handleCratePost}
        disabled={!isPostValid()}
        style={{ opacity: isPostValid() ? 1 : 0.5 }}
      >
        Create post
      </button>
      <button onClick={() => navigate('/posts')}>
        BACK
      </button>
    </div>
  )
}

export default CreatePosts;