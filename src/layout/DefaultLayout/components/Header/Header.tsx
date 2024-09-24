import { singInWithGoogle, singOutAccount } from '../../../../auth/firebase';

export const Header = () => {
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
