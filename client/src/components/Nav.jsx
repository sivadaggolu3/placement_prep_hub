import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="nav-brand"><span className="logo">🎯</span> Placement Prep</div>
      <NavLink to="/" end className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}>Dashboard</NavLink>
      <NavLink to="/aptitude" className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}>Aptitude</NavLink>
      <NavLink to="/dsa" className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}>DSA</NavLink>
      <NavLink to="/core" className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}>Core Subjects</NavLink>
      {user && (
        <div className="nav-user">
          {user.name}
          <button className="nav-logout" onClick={logout}>Log out</button>
        </div>
      )}
    </nav>
  );
}
