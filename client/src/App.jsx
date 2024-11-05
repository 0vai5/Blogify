import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import {
  Home,
  SignIn,
  SignUp,
  CreateBlog,
  Profile,
  Blogs,
  Blog,
} from '@/pages/index';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <main className="bg-white/80">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/signin" 
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-blog" 
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
