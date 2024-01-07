import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { axiosInstanceNotificationAlertService } from "../../utils/axiosInstanceHMSApp";

const AlertPreferencesButton = () => {
  const [alertData, setAlertData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAlertPreferences = async () => {
      try {
        const response = await axiosInstanceNotificationAlertService.get(
          `/alert-preferences/user/${userId}`
        );
        setAlertData(response.data);
        console.log("alert-preferences data: ", response.data);
      } catch (error) {
        console.error("Error fetching alert preferences:", error);

        // Log the specific error message if available
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    };

    fetchAlertPreferences();
  }, [userId]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isButtonDisabled = alertData.length === 0;

  return (
    <>
      <Button
        variant="success"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        style={{
          color: isButtonDisabled ? "white" : "red", // Change the color based on the condition
        }}
      >
        {isButtonDisabled ? (
          "Alert"
        ) : (
          <>
            <span style={{ color: "red" }}>Alert</span>
            <span style={{ color: "red", marginLeft: "4px" }}>
              ({alertData.length})
            </span>
          </>
        )}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alert Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isButtonDisabled ? (
            <p>No alert preferences found.</p>
          ) : (
            <ListGroup>
              {alertData.map((alert) => (
                <ListGroup.Item key={alert.preferenceId}>
                  {`Notification Type: ${alert.notificationType}`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlertPreferencesButton;

// import { useState, useEffect } from "react";
// import { Button, Modal, ListGroup } from "react-bootstrap";
// import { axiosInstanceNotificationAlertService } from "../../utils/axiosInstanceHMSApp";

// const AlertPreferencesButton = () => {
//   const [alertData, setAlertData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchAlertPreferences = async () => {
//       try {
//         const response = await axiosInstanceNotificationAlertService.get(
//           `/alert-preferences/user/${userId}`
//         );
//         setAlertData(response.data);
//         console.log("alert-preferences data: ", response.data);
//       } catch (error) {
//         console.error("Error fetching alert preferences:", error);

//         // Log the specific error message if available
//         if (error.response) {
//           console.error("Response data:", error.response.data);
//         }
//       }
//     };

//     fetchAlertPreferences();
//   }, [userId]);

//   const handleButtonClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   // Determine whether the button should be disabled
//   const isButtonDisabled = alertData.length === 0;

//   return (
//     <>
//       <Button
//         variant="success"
//         onClick={handleButtonClick}
//         disabled={isButtonDisabled}
//       >
//         {isButtonDisabled ? (
//           "Alert"
//         ) : (
//           <>
//             Alert
//             <span style={{ color: "red", marginLeft: "4px" }}>
//               ({alertData.length})
//             </span>
//           </>
//         )}
//       </Button>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Alert Preferences</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {isButtonDisabled ? (
//             <p>No alert preferences found.</p>
//           ) : (
//             <ListGroup>
//               {alertData.map((alert) => (
//                 <ListGroup.Item key={alert.preferenceId}>
//                   {`Notification Type: ${alert.notificationType}`}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default AlertPreferencesButton;

// import { useState } from "react";
// import { Button, Modal, ListGroup } from "react-bootstrap";
// import { axiosInstanceNotificationAlertService } from "../../utils/axiosInstanceHMSApp";

// const AlertPreferencesButton = () => {
//   const [alertData, setAlertData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const userId = localStorage.getItem("userId");

//   const fetchAlertPreferences = async () => {
//     try {
//       const response = await axiosInstanceNotificationAlertService.get(
//         `/alert-preferences/user/${userId}`
//       );
//       setAlertData(response.data);
//       console.log("alert-preferences data: ", response.data);
//     } catch (error) {
//       console.error("Error fetching alert preferences:", error);

//       // Log the specific error message if available
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//       }
//     }
//   };

//   const handleButtonClick = async () => {
//     setShowModal(true);
//     await fetchAlertPreferences(); // Wait for data to be fetched before opening the modal
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleButtonClick}>
//         Alert
//       </Button>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Alert Preferences</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {alertData.length === 0 ? (
//             <p>No alert preferences found.</p>
//           ) : (
//             <ListGroup>
//               {alertData.map((alert) => (
//                 <ListGroup.Item key={alert.preferenceId}>
//                   {`Notification Type: ${alert.notificationType}`}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default AlertPreferencesButton;
