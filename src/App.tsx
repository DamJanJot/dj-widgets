import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Repository from './pages/Repository'
import Docs from './pages/Docs'

export default function App(){
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="brand"><span className="badge">DJ</span> <span>App</span></div>
        <nav className="nav">
          <NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/documents">Documents</NavLink>
          <NavLink to="/calendar">Kalendarz</NavLink>
          <NavLink to="/notes">Notatnik</NavLink>
          <NavLink to="/tasks">Zadania</NavLink>
        </nav>
        <div style={{flex:1}}/>
        <nav className="nav">
          <NavLink to="/repo">Repository</NavLink>
          <NavLink to="/docs">Documentation</NavLink>
        </nav>
        <div className="row small" style={{marginTop:8}}>
          <div className="row" style={{gap:10}}>
            <div className="badge">1</div>
            <div>
              <div>111</div>
              <div className="small">111@111.pl</div>
            </div>
          </div>
          <span className="small">▼</span>
        </div>
      </aside>

      <main>
        <div className="topbar">
          <div style={{fontWeight:700}}>Dashboard</div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/repo" element={<Repository/>} />
            <Route path="/docs" element={<Docs/>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
