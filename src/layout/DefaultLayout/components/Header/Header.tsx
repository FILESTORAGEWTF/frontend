import { MdLogout } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import useBoundStore from '../../../../store/useStore';
import { singInWithGoogle, singOutAccount } from '../../../../auth/firebase';

export const Header = () => {
  const { isLoggedIn } = useBoundStore();

  const singIn = async () => {
    try {
      await singInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const singOut = async () => {
    try {
      await singOutAccount();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-20 flex w-full justify-between items-center px-5 bg-gray-300">
      <h3 className="text-lg font-semibold">VReal Soft test project</h3>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <button
            className="rounded-md bg-white hover:bg-gray-400 p-1 px-3 font-semibold flex gap-2 items-center"
            onClick={singOut}
          >
            sing out <MdLogout />
          </button>
        ) : (
          <button
            className="rounded-md bg-white hover:bg-gray-200 p-1 px-3 flex gap-2 items-center font-semibold"
            onClick={singIn}
          >
            log in
            <FcGoogle />
          </button>
        )}
      </div>
    </div>
  );
};
