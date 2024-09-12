import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppDispatch } from "../redux/store";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { dateConvert } from "../helpers/dateConvert";
import { fetchAvailableTimes } from "../redux/slices/availableTimesSlice";
import { Form, Modal, Button } from "react-bootstrap";
import { RootState } from "../redux/store";
import { setAvailableTimes } from "../redux/slices/availableTimesSlice";
import { setTime, setDate } from "../redux/slices/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";

const StyledCalendar = styled(Calendar)`
  .rbc-month-view {
    font-size: 14px;
  }

  .rbc-month-row {
    height: 50px;
  }

  .rbc-date-cell {
    padding: 5px;
  }

  .rbc-day-bg {
    height: 100%;
  }

  .rbc-selected-cell {
    background-color: #007bff !important;
    color: white !important;
  }

  .rbc-today {
    background-color: #f8d7da !important;
  }
`;

const localizer = momentLocalizer(moment);

interface SelectDateAndHourProps {
  show: boolean;
  handleClose: () => void;
}

const SelectDateAndHourModal: React.FC<SelectDateAndHourProps> = ({
  show,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { availableTimes } = useSelector(
    (state: RootState) => state.availableTimes
  );
  const { selectedTime, selectedDate } = useSelector(
    (state: RootState) => state.reservation
  );

  const handleSelectDay = async (slotInfo) => {
    dispatch(setAvailableTimes(null));
    const date = dateConvert(slotInfo.start);
    dispatch(setDate(slotInfo.start.toISOString()));
    const response = await dispatch(fetchAvailableTimes(date)).unwrap();
    dispatch(setAvailableTimes(response));
    dispatch(setTime(null));
  };

  console.log(availableTimes);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Fecha y Hora</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledCalendar
          localizer={localizer}
          events={[]}
          selectable
          onSelectSlot={handleSelectDay}
          defaultView="month"
          views={["month"]}
          style={{ height: 300 }}
          dayPropGetter={(date) => {
            const today = new Date();
            const tomorrow = moment(today).add(1, "days").toDate();
            if (
              moment(date).day() === 0 ||
              moment(date).isBefore(tomorrow, "day")
            ) {
              return {
                className: "rbc-disabled-cell",
                style: {
                  pointerEvents: "none",
                  backgroundColor: "#ffd0da",
                  color: "#ccc",
                },
              };
            }
            return {
              className:
                selectedDate && moment(date).isSame(selectedDate, "day")
                  ? "rbc-selected-cell"
                  : "",
            };
          }}
        />

        {selectedDate &&
          moment(selectedDate).day() !== 0 &&
          moment(selectedDate).isAfter(moment().add(0, "days"), "day") && (
            <div className="mt-4">
              <Form.Group controlId="availableTimes">
                <Form.Label>Turnos disponibles:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTime || ""}
                  onChange={(e) => dispatch(setTime(e.target.value))}
                >
                  <option value="">Seleccionar una opción</option>
                  {availableTimes !== null ? (
                    availableTimes.map((time, index) => (
                      <option key={index} value={time.startTime}>
                        {`${time.startTime} - ${time.endTime}`}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay turnos disponibles
                    </option>
                  )}
                </Form.Control>
              </Form.Group>
            </div>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            dispatch(setAvailableTimes(null));
            dispatch(setDate(null));
          }}
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (selectedDate && selectedTime) {
              handleClose();
            } else
              alert("Debe seleccionar una fecha y hora para poder continuar.");
          }}
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SelectDateAndHourModal;
