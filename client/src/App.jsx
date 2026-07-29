import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import Toast from './components/Toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Aptitude from './pages/Aptitude';
import Dsa from './pages/Dsa';
import Core from './pages/Core';

function AppShell() {
  const { user } = useAuth();

  return (
    <>
      {user && <Nav />}
      {user && <Toast />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude"
          element={
            <ProtectedRoute>
              <Aptitude />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dsa"
          element={
            <ProtectedRoute>
              <Dsa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/core"
          element={
            <ProtectedRoute>
              <Core />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <AppShell />
      </TasksProvider>
    </AuthProvider>
  );
}
