import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const CancellationConfirmationModalComponent: React.FC<ConfirmModalProps> = ({
  show,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cancelar reservación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Está seguro/a que quiere cancelar esta reservación?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => handleConfirm()}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancellationConfirmationModalComponent;
