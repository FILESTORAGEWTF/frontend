import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '~/auth/firebase';
import useBoundStore from '~/store/useStore';

interface AuthGuardProps {
  Page: React.ComponentType;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ Page }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useBoundStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        setLoggedIn(true);
        if (location.pathname === '/empty') {
          navigate('/dashboard', { replace: true });
        }
      } else {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/empty');
      }
    });

    return () => unsubscribe();
  }, [navigate, setLoggedIn]);

  return isAuthenticated ? <Page /> : null;
};
