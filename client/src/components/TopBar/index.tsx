import { TopBarContainer } from './styled';
import { useAppSelector, useTheme } from '../../utils/hooks';
import { IoMdNotificationsOutline, IoIosSearch } from "react-icons/io";
import { MdModeNight, MdOutlineLightMode } from "react-icons/md";
import { lightTheme, darkTheme } from '../../theme';

export const TopBarComponent = () => {
    const user = useAppSelector(state => state.auth.user)
    const { theme, toggleTheme } = useTheme();

  return <TopBarContainer>
        <div>Welcome, {user?.firstName}</div>
        <div>
          <button onClick={toggleTheme}>
          {theme === lightTheme ? (
                        <MdOutlineLightMode />
                    ) : (
                      <MdModeNight />
                    )}
          </button>
        <IoMdNotificationsOutline />
        
        
        <IoIosSearch />
        </div>
  </TopBarContainer>;
};
