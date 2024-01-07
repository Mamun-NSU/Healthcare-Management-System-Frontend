// import { Card } from "react-bootstrap";

// const AlertPreferenceCart = ({ preference }) => {
//   return (
//     <Card
//       className="my-3"
//       style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
//     >
//       <Card.Body>
//         <Card.Title>
//           <strong>User ID:</strong> {preference.userId}
//         </Card.Title>
//         <Card.Text>
//           <strong>Notification Type:</strong> {preference.notificationType}
//         </Card.Text>
//         <Card.Text>
//           <strong>Enabled:</strong>{" "}
//           {preference.enabled ? (
//             <span style={{ color: "green" }}>Yes</span>
//           ) : (
//             <span style={{ color: "red" }}>No</span>
//           )}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AlertPreferenceCart;

import { Card } from "react-bootstrap";

const AlertPreferenceCart = ({ preference }) => {
  return (
    <Card
      className="my-3"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Card.Body>
        <Card.Title>
          <strong>User ID:</strong> {preference.userId}
        </Card.Title>
        <Card.Text>
          <strong>Notification Type:</strong> {preference.notificationType}
        </Card.Text>
        <Card.Text>
          <strong>Enabled:</strong>{" "}
          {preference.enabled ? (
            <span style={{ color: "green", fontWeight: "bold" }}>Yes</span>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>No</span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AlertPreferenceCart;
