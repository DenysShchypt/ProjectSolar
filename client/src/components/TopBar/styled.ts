import styled from '@emotion/styled';

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
align-items: center; 

  padding: 24px 32px;
`;

export const TopBarIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;

  gap: 16px;
`;



export const InputTopBarsContainer = styled.div`
  display: flex;
  position: relative;
`;

export const InputBtnWrapper = styled.button`
  border: none;
  background-color: transparent;

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InputTopBarSpan = styled.span`
display: table-cell;
  height:100%;
  width: 1px;

  padding: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputBtnContainer = styled.button`
  position: absolute;
  top: 14px;
  left: 5px;

  border: none;
  background-color: transparent;

  svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InputTopBar = styled.input`
  display: flex;

  padding: 12px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;
