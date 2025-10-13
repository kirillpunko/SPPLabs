import './App.scss'
import { Routes, Route } from 'react-router-dom';
import { Navigation } from "./components/navigation/navigation.tsx";
import MainPage from "./pages/mainPage/mainPage.tsx";
import ProjectList from "./components/projectList/projectList.tsx";
import ProjectPage from "./pages/projectPage/projectPage.tsx";
import ProfilePage from "./pages/profilePage/profilePage.tsx";

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
