import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 100%;
  label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }
`;

export const ListaResultados = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;

  li {
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }

    em {
      font-size: 0.75rem;
      color: #666;
      pointer-events: none;
    }
  }
`;
