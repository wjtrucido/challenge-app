import { AppDispatch } from "../redux/store";
import { fetchServices } from "../redux/slices/servicesSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { RootState } from "../redux/store";
import {
  resetReservation,
  setClient,
  setServiceId,
} from "../redux/slices/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import SelectClientModal from "./SelectClientModal";
import SelectDateAndHour from "./SelectDateAndHourModal";
import { setClientId } from "../redux/slices/reservationSlice";

interface ReservationModalProps {
  title: string;
  initialization: () => void;
  action: (id?: string) => void | Promise<void>;
  show: boolean;
  handleClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  title,
  action,
  show,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    reservationId,
    selectedClient,
    selectedClientId,
    selectedDate,
    selectedServiceId,
    selectedTime,
  } = useSelector((state: RootState) => state.reservation);
  const { services } = useSelector((state: RootState) => state.services);

  const [showClientModal, setShowClientModal] = React.useState(false);
  const [showDateTimeModal, setShowDateTimeModal] = React.useState(false);

  const handleClientSelect = (id: string, client: string) => {
    dispatch(setClientId(id));
    dispatch(setClient(client));
    setShowClientModal(false);
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                value={selectedClient || ""}
                readOnly
                onClick={() => setShowClientModal(true)}
                placeholder="Seleccionar cliente"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Servicio</Form.Label>
              <Form.Control
                as="select"
                value={selectedServiceId || ""}
                onChange={(e) => dispatch(setServiceId(e.target.value))}
              >
                <option>Seleccionar servicio</option>
                {services.map((service, key) => (
                  <option key={key} value={service.id}>
                    {service.description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha y hora</Form.Label>
              <Form.Control
                type="text"
                value={
                  selectedDate && selectedTime
                    ? `Fecha: ${
                        selectedDate?.split("T")[0]
                      }, hora: ${selectedTime} hs.`
                    : ""
                }
                readOnly
                onClick={() => setShowDateTimeModal(true)}
                placeholder="Seleccionar fecha y hora"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              dispatch(resetReservation());
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (
                selectedClientId &&
                selectedServiceId &&
                selectedDate &&
                selectedTime
              ) {
                action(reservationId!);
                dispatch(resetReservation());
                handleClose();
              } else {
                alert("Debe completar todos los campos para poder guardar");
              }
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <SelectClientModal
        show={showClientModal}
        handleClose={() => {
          setShowClientModal(false);
        }}
        onSelectClient={handleClientSelect}
      />

      <SelectDateAndHour
        show={showDateTimeModal}
        handleClose={() => setShowDateTimeModal(false)}
      />
    </>
  );
};

export default ReservationModal;
