import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import Navbar from "./components/Navbar"
import ProjectDetailsPage from "./pages/ProjectDetails"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <>
    <div className='p-5 bg-zinc-800 min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
      </Routes>
    </div>
    </>
    
  )
}

export default App
