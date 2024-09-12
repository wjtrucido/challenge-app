import { AppDispatch } from "../redux/store";
import { fetchReservations } from "../redux/slices/reservationsSlice";
import { RootState } from "../redux/store";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ReservationModal from "./ReservationModal";
import styled from "styled-components";
import { cancelReservation } from "../redux/slices/reservationSlice";
import {
  resetReservation,
  setClient,
  setClientId,
  setDate,
  setServiceId,
  setTime,
} from "../redux/slices/reservationSlice";
import { createReservation } from "../redux/slices/reservationSlice";
import { setSelectedReservationId } from "../redux/slices/reservationSlice";
import { updateReservation } from "../redux/slices/reservationSlice";
import SelectClientFilterModal from "./selectClientFilterModal";
import {
  setSelectedClientFilter,
  setSelectedClientIdFilter,
} from "../redux/slices/filterSlice";
import { fetchServices } from "../redux/slices/servicesSlice";
import { setSelectedServiceIdFilter } from "../redux/slices/filterSlice";
import {
  setSelectedDateFilter,
  resetFilters,
} from "../redux/slices/filterSlice";
import LoadingComponent from "./Loading";
import NoRecordsComponent from "./NoRecords";
import CancellationConfirmationModalComponent from "./CancellationConfirmationModal";
import PaginationComponent from "./Pagination";

const TableContainer = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-y: auto;
`;

// Filtros
const FilterRow = styled(Row)`
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

// Columnas de los filtros
const FilterCol = styled(Col)`
  flex: 1;
  min-width: 200px;
  margin-bottom: 5px;
`;

const AddButtonRow = styled(Row)`
  width: 30%;
  width-min: 300px;
  display: flex;
  margin-bottom: 20px;
  padding-left: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaginationRow = styled(Row)`
  justify-content: center;
  margin-top: 20px;
`;

const ReservationsTable: React.FC = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [showClientModal, setShowClientModal] = React.useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const { reservations, loading } = useSelector(
    (state: RootState) => state.reservations
  );
  const {
    reservation,
    reservationId,
    selectedClientId,
    selectedServiceId,
    selectedDate,
    selectedTime,
  } = useSelector((state: RootState) => state.reservation);

  const { services } = useSelector((state: RootState) => state.services);

  const { selectedClientFilter, selectedServiceIdFilter, selectedDateFilter } =
    useSelector((state: RootState) => state.filter);

  const handleSelectClientFilter = (id: string, client: string) => {
    dispatch(setSelectedClientIdFilter(id));
    dispatch(setSelectedClientFilter(client));
    setShowClientModal(false);
  };

  const handleShowModal = () => {
    setShowReservationModal(true);
  };
  const handleCloseModal = () => {
    setShowReservationModal(false);
    if (isEditModal) {
      dispatch(resetReservation());
    }
  };

  {
    /* Properties to send to reservationModal*/
  }
  const addReservationAction = async (): Promise<void> => {
    await dispatch(
      createReservation({
        clientId: selectedClientId!,
        serviceId: selectedServiceId!,
        date: selectedDate!,
        hour: selectedTime!,
      })
    );
    resetReservation();
  };

  const updateReservationAction = async (id: string): Promise<void> => {
    await dispatch(
      updateReservation({
        id,
        reservationData: {
          clientId: selectedClientId!,
          serviceId: selectedServiceId!,
          date: selectedDate!,
          hour: selectedTime!,
        },
      })
    );
    dispatch(resetReservation());
  };

  const handleAddButton = () => {
    setIsEditModal(false);
    handleShowModal();
  };

  const initializeEditForm = (id: string) => {
    const selectedReservation = reservations.data.find(
      (reservation: object) => reservation.id === id
    );
    dispatch(setSelectedReservationId(id));
    dispatch(setClientId(selectedReservation.clientId._id));
    dispatch(setClient(selectedReservation.clientId.fullName));
    dispatch(setServiceId(selectedReservation.serviceId._id));
    dispatch(setDate(selectedReservation.date));
    dispatch(setTime(selectedReservation.hour));
  };

  const handleUpdateButton = (id: string) => {
    setIsEditModal(true);
    dispatch(setSelectedReservationId(id));
    initializeEditForm(id);
    handleShowModal();
  };

  const handleCancelConfirmation = () => {
    const reservationData = {
      active: false,
    };
    console.log("debugueando reservation data: ", reservationId);
    dispatch(cancelReservation({ id: reservationId!, reservationData }));
    setShowCancellationModal(false);
  };

  const handleCancelButton = (id: string) => {
    dispatch(setSelectedReservationId(id));
    setShowCancellationModal(true);
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReservations(currentPage));
  }, [dispatch, currentPage, reservation, reservationId]);

  /* reservationFilters */
  const filteredReservations = reservations.data
    .filter((reservation: object) => {
      if (selectedClientFilter) {
        return reservation.clientId.fullName
          .toLowerCase()
          .includes(selectedClientFilter.toLowerCase());
      }
      return true;
    })
    .filter((reservation: object) => {
      if (selectedServiceIdFilter) {
        return reservation.serviceId._id === selectedServiceIdFilter;
      }
      return true;
    })
    .filter((reservation: object) => {
      if (selectedDateFilter) {
        const reservationDate = new Date(reservation.date)
          .toISOString()
          .split("T")[0];
        const selectedDate = new Date(selectedDateFilter)
          .toISOString()
          .split("T")[0];
        return reservationDate === selectedDate;
      }
      return true;
    });

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {/* Modal */}
      <ReservationModal
        title={isEditModal ? "Editar Reservación" : "Nueva Reservación"}
        action={isEditModal ? updateReservationAction : addReservationAction}
        show={showReservationModal}
        handleClose={handleCloseModal}
      />
      {/* Modal */}
      <SelectClientFilterModal
        show={showClientModal}
        handleClose={() => {
          setShowClientModal(false);
        }}
        onSelectClient={handleSelectClientFilter}
      />
      <TableContainer>
        <FilterRow>
          <FilterCol>
            <Form.Group>
              <Form.Control
                type="text"
                value={selectedClientFilter || ""}
                readOnly
                onClick={() => setShowClientModal(true)}
                placeholder="Filtrar por cliente"
              />
            </Form.Group>
          </FilterCol>
          <FilterCol>
            <Form.Group>
              <Form.Control
                as="select"
                value={selectedServiceIdFilter || ""}
                onChange={(e) =>
                  dispatch(setSelectedServiceIdFilter(e.target.value))
                }
              >
                <option>Seleccionar servicio</option>
                {services.map((service, key) => (
                  <option key={key} value={service.id}>
                    {service.description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </FilterCol>
          <FilterCol>
            <Form.Control
              type="date"
              value={selectedDateFilter || ""}
              placeholder="Filtrar por fecha"
              onChange={(e) => {
                dispatch(setSelectedDateFilter(e.target.value));
              }}
            />
          </FilterCol>
          <FilterCol>
            <Button
              variant="secondary"
              style={{ minWidth: "180px" }}
              onClick={() => {
                dispatch(resetFilters());
              }}
            >
              Resetear filtros
            </Button>
          </FilterCol>
        </FilterRow>

        <AddButtonRow>
          <Button
            variant="primary"
            style={{ minWidth: "180px", width: "100%" }}
            onClick={handleAddButton}
          >
            Agregar Reservación
          </Button>
        </AddButtonRow>
        {filteredReservations.length === 0 ? (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
            <NoRecordsComponent />
          </>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Duración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((item, index: number) => (
                <>
                  <tr key={index}>
                    <td>{item.clientId?.fullName || "No disponible"}</td>
                    <td>{item.serviceId?.description || "No disponible"}</td>
                    <td>{item.date.split("T")[0]}</td>
                    <td>{item.hour}</td>
                    <td>{item.duration} min</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          handleUpdateButton(item.id);
                        }}
                      >
                        Modificar
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          handleCancelButton(item.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>
      <CancellationConfirmationModalComponent
        show={showCancellationModal}
        handleClose={() => setShowCancellationModal(false)}
        handleConfirm={() => {
          handleCancelConfirmation();
        }}
      ></CancellationConfirmationModalComponent>
      <PaginationRow>
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationRow>
    </>
  );
};

export default ReservationsTable;
