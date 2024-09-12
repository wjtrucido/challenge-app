import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const LoadingContainer = styled.div`
  align-items: center;
  background-color: #f8f9fa;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

// Spinner personalizado usando styled-components
const CustomSpinner = styled(Spinner)`
  color: #007bff;
  height: 3rem;
  width: 3rem;
`;

const LoadingComponent: React.FC = () => {
  return (
    <LoadingContainer>
      <CustomSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </CustomSpinner>
    </LoadingContainer>
  );
};

export default LoadingComponent;
