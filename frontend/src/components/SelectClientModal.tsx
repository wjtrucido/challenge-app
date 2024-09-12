import { AppDispatch } from "../redux/store";
import { fetchClients } from "../redux/slices/clientsSlice";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .modal-dialog {
    height: 80vh;
    max-height: 80vh;
    width: 70vw;
    max-width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    height: 100%;
    width: 100%;

  .modal-body {
    overflow-y: auto;
    height: 100%;
  }
`;

interface SelectClientModalProps {
  show: boolean;
  handleClose: () => void;
  onSelectClient: (id: string, client: string) => void;
}

const SelectClientModal: React.FC<SelectClientModalProps> = ({
  show,
  handleClose,
  onSelectClient,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (show) {
      dispatch(fetchClients());
    }
  }, [dispatch, show]);

  return (
    <StyledModal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {clients.map(
            (client, key) => (
              console.log(client),
              (
                <ListGroup.Item
                  action
                  onClick={() => {
                    onSelectClient(client.id, client.fullName);
                  }}
                  key={key}
                >
                  {client.fullName}
                </ListGroup.Item>
              )
            )
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default SelectClientModal;
