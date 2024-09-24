import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../auth/firebase';

interface AuthGuardProps {
  Page: React.ComponentType;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ Page }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        if (location.pathname === '/empty') {
          navigate('/dashboard', { replace: true });
        }
      } else {
        navigate('/empty');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return isAuthenticated ? <Page /> : null;
};
