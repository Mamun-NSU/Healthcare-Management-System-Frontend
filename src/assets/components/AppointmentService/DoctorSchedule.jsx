// import { useState } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import AddAppointmentForm from "./AddAppointmentForm";

// const DoctorSchedule = ({ schedule, doctorId }) => {
//   const [showModal, setShowModal] = useState(false);
//   const patientId = localStorage.getItem("userId");

//   const handleBookAppointment = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const cardStyle = {
//     margin: "15px",
//     padding: "20px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.2s",
//     "&:hover": {
//       transform: "scale(1.02)",
//     },
//   };

//   const getColorBasedOnAppointmentType = () => {
//     return schedule.appointmentType === "ONLINE" ? "green" : "gray";
//   };

//   const doctorInfo = {
//     doctorName: `${schedule.dfirstname} ${schedule.dlastName}`,
//     doctorId: doctorId,
//     availableDay: schedule.availableDay,
//     appointmentType: schedule.appointmentType,
//   };
//   console.log("doctorInfo in DoctorSchedule", doctorInfo);
//   return (
//     <Card style={cardStyle} className="schedule-card">
//       <Card.Body>
//         <Card.Title style={{ color: getColorBasedOnAppointmentType() }}>
//           {`Dr. ${doctorInfo.doctorName}'s Schedule`}
//         </Card.Title>
//         <Card.Text>{`Available Day: ${doctorInfo.availableDay}`}</Card.Text>
//         {/* Other schedule details here */}

//         <Link to={`/addAppointment/${patientId}`}>
//           <Button
//             variant={
//               doctorInfo.appointmentType === "ONLINE" ? "success" : "info"
//             }
//             onClick={handleBookAppointment}
//           >
//             Book Appointment
//           </Button>
//         </Link>
//       </Card.Body>

//       {showModal && (
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Book Appointment</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <AddAppointmentForm
//               doctorInfo={doctorInfo}
//               onClose={handleCloseModal}
//             />
//           </Modal.Body>
//         </Modal>
//       )}
//     </Card>
//   );
// };

// export default DoctorSchedule;

// import { useState } from "react";
// import { Card, Button, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import AddAppointmentForm from "./AddAppointmentForm";

// const DoctorSchedule = ({ schedule, doctorId }) => {
//   const [showModal, setShowModal] = useState(false);
//   const patientId = localStorage.getItem("userId");

//   const handleBookAppointment = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const cardStyle = {
//     margin: "15px",
//     padding: "20px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.2s",
//     "&:hover": {
//       transform: "scale(1.02)",
//     },
//   };

//   const getColorBasedOnAppointmentType = () => {
//     return schedule.appointmentType === "ONLINE" ? "green" : "gray";
//   };

//   const doctorInfo = {
//     doctorName: `${schedule.dfirstname} ${schedule.dlastName}`,
//     doctorId: doctorId,
//     availableDay: schedule.availableDay,
//     appointmentType: schedule.appointmentType,
//   };

//   console.log("doctorInfo in DoctorSchedule", doctorInfo);

//   return (
//     <Card style={cardStyle} className="schedule-card">
//       <Card.Body>
//         <Card.Title style={{ color: getColorBasedOnAppointmentType() }}>
//           {`Dr. ${doctorInfo.doctorName}'s Schedule`}
//         </Card.Title>
//         <Card.Text>{`Available Day: ${doctorInfo.availableDay}`}</Card.Text>
//         {/* Other schedule details here */}

//         <Link to={`/addAppointment/${patientId}`}>
//           <Button
//             variant={
//               doctorInfo.appointmentType === "ONLINE" ? "success" : "info"
//             }
//             onClick={handleBookAppointment}
//           >
//             Book Appointment
//           </Button>
//         </Link>
//       </Card.Body>

//       {showModal && (
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Book Appointment</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {/* Log doctorInfo before rendering AddAppointmentForm */}
//             {console.log("doctorInfo passed to AddAppointmentForm", doctorInfo)}
//             <AddAppointmentForm
//               onClose={handleCloseModal}
//               doctorInfo={doctorInfo}
//             />
//           </Modal.Body>
//         </Modal>
//       )}
//     </Card>
//   );
// };

// export default DoctorSchedule;

import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddAppointmentForm from "./AddAppointmentForm";

const DoctorSchedule = ({ schedule, doctorId }) => {
  const [showModal, setShowModal] = useState(false);
  const patientId = localStorage.getItem("userId");

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cardStyle = {
    margin: "15px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  };

  const getColorBasedOnAppointmentType = () => {
    return schedule.appointmentType === "ONLINE" ? "green" : "gray";
  };

  const doctorInfo = {
    doctorName: `${schedule.dfirstname} ${schedule.dlastName}`,
    doctorId: doctorId,
    availableDay: schedule.availableDay,
    appointmentType: schedule.appointmentType,
  };

  console.log("doctorInfo in DoctorSchedule", doctorInfo);

  return (
    <Card style={cardStyle} className="schedule-card">
      <Card.Body>
        <Card.Title style={{ color: getColorBasedOnAppointmentType() }}>
          {`Dr. ${doctorInfo.doctorName}'s Schedule`}
        </Card.Title>
        <Card.Text>{`Available Day: ${doctorInfo.availableDay}`}</Card.Text>

        <Link to={`/addAppointment/${patientId}`}>
          <Button
            variant={
              doctorInfo.appointmentType === "ONLINE" ? "success" : "info"
            }
            onClick={handleBookAppointment}
          >
            Book Appointment
          </Button>
        </Link>
      </Card.Body>

      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Book Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddAppointmentForm
              doctorInfo={doctorInfo}
              onClose={handleCloseModal}
            />
          </Modal.Body>
        </Modal>
      )}
    </Card>
  );
};

export default DoctorSchedule;
