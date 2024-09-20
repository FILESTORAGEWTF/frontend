import { Outlet } from 'react-router-dom';
import { Header, Main } from './components';

export const DefaultLayout = () => {
  return (
    <div className="">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};
