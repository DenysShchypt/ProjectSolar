import {
  InputBtnContainer,
  InputBtnWrapper,
  InputTopBar,
  InputTopBarsContainer,
  InputTopBarSpan,
  TopBarContainer,
  TopBarIconsContainer,
} from './styled';
import { useAppSelector, useTheme } from '../../utils/hooks';
import { IoMdNotificationsOutline, IoIosSearch } from 'react-icons/io';
import { MdModeNight, MdOutlineLightMode } from 'react-icons/md';
import { lightTheme } from '../../theme';

export const TopBarComponent = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();

  return (
    <TopBarContainer>
      <div>Welcome, {user?.firstName}</div>
      <TopBarIconsContainer>
        <InputBtnWrapper onClick={toggleTheme}>
          {theme === lightTheme ? <MdOutlineLightMode /> : <MdModeNight />}
        </InputBtnWrapper>
        <InputBtnWrapper>
          <IoMdNotificationsOutline />
        </InputBtnWrapper>
        <InputTopBarSpan>|</InputTopBarSpan>
        <InputTopBarsContainer>
          <InputBtnContainer>
            <IoIosSearch />
          </InputBtnContainer>

          <InputTopBar placeholder="Search..." />
        </InputTopBarsContainer>
      </TopBarIconsContainer>
    </TopBarContainer>
  );
};
