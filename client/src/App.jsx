import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import {
  Home,
  SignIn,
  SignUp,
  CreateBlog,
  EditBlog,
  Profile,
  Blogs,
  Blog
} from "@/pages/index"

const App = () => {
  return (
    <main className={'bg-white/80'}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/edit-blog' element={<EditBlog />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App