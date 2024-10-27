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
          <Route path='/' element={'Home'} />
          <Route path='/signin' element={'signin'} />
          <Route path='/signup' element={'signup'} />
          <Route path='/create-blog' element={'create-blog'} />
          <Route path='/edit-blog' element={'edit-blog'} />
          <Route path='/profile' element={'profile'} />
          <Route path='/blogs' element={'blogs'} />
          <Route path='/blog' element={'blog'} />
        </Routes>
      </Router>
    </main>
  )
}

export default App