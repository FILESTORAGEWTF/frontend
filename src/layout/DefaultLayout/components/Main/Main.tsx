import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const Main: FC<Props> = ({ children }) => {
  return <div className="px-14">{children}</div>;
};
