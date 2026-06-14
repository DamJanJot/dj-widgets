import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import News from './pages/News'
import Markets from './pages/Markets'
import Docs from './pages/Docs'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Settings from './pages/Settings'
import Repository from './pages/Repository'
import Operations from './pages/Operations'
import Notes from './pages/Notes'

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/repo" element={<Repository />} />
            <Route path="/info" element={<Docs />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
