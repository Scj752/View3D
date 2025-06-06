// utils/withAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const withAuth = (Component) => {
  const AuthGuard = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, loading, navigate]);

    return isAuthenticated || loading ? <Component {...props} /> : null;
  };

  return AuthGuard;
};