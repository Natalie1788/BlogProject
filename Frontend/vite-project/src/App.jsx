import Navbar from './components/Navbar'
import './App.css'
import { useTheme } from "./context/ThemeContext"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Homepage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import SignInPage from './pages/SignInPage';
import AccountPage from './pages/AccountPage';
import CreatePostPage from './pages/CreatePostPage';
import UserPostsPage from './pages/UserPostsPage';
import GetPost from "./pages/GetPost"


function App() {
  const { isDark } = useTheme();

  return (
    <BrowserRouter>
    <div className={`app ${isDark ? "dark" : "light"}`}>
   <Navbar/>
   <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />}/>
          <Route path="/signup" element={<CreateUserPage />}/>
          <Route path="/signin" element={<SignInPage />}/>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/createpost" element={<CreatePostPage />} />
          <Route path="/userposts" element={<UserPostsPage />} />
          <Route path="/posts/:id" element={<GetPost />} />
    </Routes>   
    </div>
   </BrowserRouter>
  )
}

export default App
