import { Route, Routes } from "react-router-dom";
import Posts from "./pages/posts/allPosts";
import CreatePosts from "./pages/posts/createPost";
import EditPosts from "./pages/posts/editPost";
import Register from "./pages/loginAndRegister/register";
import Login from "./pages/loginAndRegister/login";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={< Posts />} />
        <Route path="/create-post" element={< CreatePosts />} />
        <Route path="/edit-post/:id" element={< EditPosts />} />
      </Routes>
    </>
  )
}

export default App;