import { onAuthStateChanged } from 'firebase/auth';
import { auth, singInWithGoogle, singOutAccount } from '../../../../shared/auth/firebase';
import { useEffect } from 'react';

export const Header = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;
      const token = await currentUser.getIdToken();
      localStorage.setItem('token', token);
    });

    return () => unsubscribe();
  }, []);

  const singIn = async () => {
    try {
      const result = await singInWithGoogle();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const singOut = async () => {
    try {
      const result = await singOutAccount();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-20 flex border-4 w-full justify-between items-center px-5">
      Header
      <div className="flex gap-4 items-center">
        <button className="rounded-xl bg-slate-500 text-white p-2 px-3" onClick={singIn}>
          sing in
        </button>
        <button className="rounded-xl bg-slate-500 text-white p-2 px-3" onClick={singOut}>
          sing out
        </button>
      </div>
    </div>
  );
};
