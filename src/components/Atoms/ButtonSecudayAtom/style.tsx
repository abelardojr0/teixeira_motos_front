import styled from "styled-components";

export const ButtonAtomStyled = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  background-color: transparent;
  padding: 15px 30px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  &:hover {
    transform: scale(1.03);
  }
`;
