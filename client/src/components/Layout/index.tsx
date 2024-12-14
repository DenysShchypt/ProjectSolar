import { ILayout } from '../../common/types/layout';
import { TopBarComponent } from '../TopBar';

export const LayoutComponent = ({ children }: ILayout) => {
  return (
    <>
    <TopBarComponent/>
         {children}
    </>
  );
};
