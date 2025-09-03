import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import News from './pages/News'
import Markets from './pages/Markets'
import Docs from './pages/Docs'

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
          </Routes>
        </div>
      </div>
    </div>
  )
}
