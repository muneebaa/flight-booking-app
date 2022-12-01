import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = ({ user, redirectPath = '/' }) => {
  console.log(user);
  if (user.role !== 'admin') {
    console.log('heloooo');
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
