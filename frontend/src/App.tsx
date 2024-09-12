import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReservationsTable from "./components/ReservationsTable";
import styled from "styled-components";

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const Title = styled.h2`
  margin-top: 20px; 
  margin-bottom: 20px;
  text-align: center;
`;

const App: React.FC = () => {
  return (
    <>
      <CenteredContainer fluid>
        <Title>Reservaciones</Title>
        <ReservationsTable />
      </CenteredContainer>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default App;
