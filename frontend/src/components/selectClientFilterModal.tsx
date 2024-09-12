import React, { useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { fetchClients } from "../redux/slices/clientsSlice";
import { AppDispatch } from "../redux/store";

const StyledModal = styled(Modal)`
  .modal-dialog {
    align-items: center;
    display: flex;
    height: 80vh;
    justify-content: center;
    max-height: 80vh;
    max-width: 70vw;
    min-width: 60vw;
    width: 40vw;
  }

  .modal-content {
    height: 100%;
    width: 100%;
  }

  .modal-body {
    height: 100%;
    overflow-y: auto;
  }
`;

interface SelectClientFilterModalProps {
  show: boolean;
  handleClose: () => void;
  onSelectClient: (id: string, client: string) => void;
}

const SelectClientFilterModal: React.FC<SelectClientFilterModalProps> = ({
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
        <Modal.Title>Seleccione un cliente para poder filtrar:</Modal.Title>
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

export default SelectClientFilterModal;
