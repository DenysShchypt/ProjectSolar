import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const RegisterTitle = styled.h2`
  margin-bottom: 8px;
`;

export const RegisterText = styled.p`
  margin-bottom: 16px;
`;

export const WrapperRegisterInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  margin-bottom: 16px;
`;

export const RegisterLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  gap: 4px;
  width: 100%;
`;

export const RegisterInput = styled.input`
  width: 100%;

  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const WrapperTextForLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextForLink = styled.p`
  font-size: 12px;
  line-height: 1.17;
  letter-spacing: -0.03em;
  color: black;
`;

export const AccentTextForLink = styled.span`
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  /* text-decoration: underline;
  text-decoration-skip-ink: none; */
  color: teal;
`;
