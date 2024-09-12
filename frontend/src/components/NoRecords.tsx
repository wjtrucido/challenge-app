import React from "react";
import styled from "styled-components";

const CenteredContainer = styled.div`
  align-items: center;
  background-color: #f8f9fa;
  display: flex;
  height: 50vh;
  justify-content: center;
  text-align: center;
`;

const MessageText = styled.p`
  color: #6c757d;
  font-size: 1.5rem;
`;

const NoRecordsComponent: React.FC = () => {
  return (
    <CenteredContainer>
      <MessageText>
        No se han encontrado registros para los filtros seleccionados en esta
        página, puede resetear los filtros y agregar nuevas reservaciones.
      </MessageText>
    </CenteredContainer>
  );
};

export default NoRecordsComponent;
