import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const InfoCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
