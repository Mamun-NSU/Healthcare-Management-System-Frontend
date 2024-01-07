import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import PatientCart from "../PatientService/PatientCart";
import DoctorCart from "../DoctorService/DoctorCart";
import MedicineCart from "../PharmaceuticalService/MedicineCart";
import EquipmentCart from "../PharmaceuticalService/EquipmentCart";
import ReviewCart from "../CommunityService/ReviewCart";

const HelpDeskSearchComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const [patients, doctors, medicines, equipment, reviews] =
        await Promise.all([
          axios.get("http://localhost:8200/patients/all"),
          axios.get(
            "http://localhost:9090/doctordatamanagement-app/doctors/all"
          ),
          axios.get("http://localhost:8400/medicines/all"),
          axios.get("http://localhost:8400/equipment/all"),
          axios.get("http://localhost:8600/reviews/all"),
        ]);

      const allResults = [
        ...patients.data,
        ...doctors.data,
        ...medicines.data,
        ...equipment.data,
        ...reviews.data,
      ];

      const searchFields = [
        "firstName",
        "lastName",
        "gender",
        "phoneNo",
        "bloodGroup",
        "dateOfBirth", // Patient fields
        "dfirstName",
        "dlastName",
        "dgender",
        "specialities",
        "qualifications",
        "room", // Doctor fields
        "medicineName",
        "category",
        "dosage",
        "manufacturedBy",
        "expirationDate",
        "quantity",
        "sideEffects",
        "expired", // Medicine fields
        "name",
        "description",
        "manufacturer",
        "purchaseDate",
        "expired",
        "equipmentRoom", // Equipment fields
        "reviewId",
        "patientId",
        "rating",
        "comment", // Review fields
      ];

      const filteredResults = allResults.filter((item) => {
        return searchFields.some((field) => {
          return (
            item[field] &&
            item[field]
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
        });
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call the fetchSearchResults function whenever searchText changes
  useEffect(() => {
    fetchSearchResults();
  }, [searchText]);

  return (
    <Container>
      <h1>Search Results</h1>
      <input
        value={searchText}
        placeholder="Enter search key"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      {loading && <h1 style={{ color: "purple" }}>Loading</h1>}

      {searchText && (
        <Container>
          <Row>
            {searchResults.length > 0 ? (
              searchResults.map((result, i) => (
                <Col key={i} lg={4} md={6} sm={12}>
                  {role === "ADMIN" && result.firstName !== undefined ? (
                    <PatientCart patient={result} />
                  ) : result.specialities !== undefined ? (
                    <DoctorCart doctor={result} />
                  ) : result.medicineName !== undefined ? (
                    <MedicineCart medicine={result} />
                  ) : (role === "ADMIN" || role === "DOCTOR") &&
                    result.equipmentId !== undefined ? (
                    <EquipmentCart equipment={result} />
                  ) : (
                    token &&
                    result.rating !== undefined && (
                      <ReviewCart review={result} />
                    )
                  )}
                </Col>
              ))
            ) : (
              <p>No results found</p>
            )}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default HelpDeskSearchComponent;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import PatientCart from "../PatientService/PatientCart";
// import DoctorCart from "../DoctorService/DoctorCart";
// import MedicineCart from "../PharmaceuticalService/MedicineCart";
// import EquipmentCart from "../PharmaceuticalService/EquipmentCart";
// import ReviewCart from "../CommunityService/ReviewCart";

// const HelpDeskSearchComponent = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const role = "ADMIN"; // Replace with actual role or fetch from context
//   const token = ""; // Replace with actual token or fetch from context

//   const fetchSearchResults = async () => {
//     setLoading(true);
//     try {
//       const [patients, doctors, medicines, equipment, reviews] =
//         await Promise.all([
//           axios.get("http://localhost:8200/patients/all"),
//           axios.get(
//             "http://localhost:9090/doctordatamanagement-app/doctors/all"
//           ),
//           axios.get("http://localhost:8400/medicines/all"),
//           axios.get("http://localhost:8400/equipment/all"),
//           axios.get("http://localhost:8600/reviews/all"),
//         ]);

//       const allResults = [
//         ...patients.data,
//         ...doctors.data,
//         ...medicines.data,
//         ...equipment.data,
//         ...reviews.data,
//       ];

//       const searchFields = [
//         "firstName",
//         "lastName",
//         "gender",
//         "phoneNo",
//         "bloodGroup",
//         "dateOfBirth", // Patient fields
//         "dfirstName",
//         "dlastName",
//         "dgender",
//         "specialities",
//         "qualifications",
//         "room", // Doctor fields
//         "medicineName",
//         "category",
//         "dosage",
//         "manufacturedBy",
//         "expirationDate",
//         "quantity",
//         "sideEffects",
//         "expired", // Medicine fields
//         "name",
//         "description",
//         "manufacturer",
//         "purchaseDate",
//         "expired",
//         "equipmentRoom", // Equipment fields
//         "reviewId",
//         "patientId",
//         "rating",
//         "comment", // Review fields
//       ];

//       const filteredResults = allResults.filter((item) => {
//         return searchFields.some((field) => {
//           return (
//             item[field] &&
//             item[field]
//               .toString()
//               .toLowerCase()
//               .includes(searchText.toLowerCase())
//           );
//         });
//       });

//       setSearchResults(filteredResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Call the fetchSearchResults function whenever searchText changes
//   useEffect(() => {
//     fetchSearchResults();
//   }, [searchText]);

//   return (
//     <Container>
//       <h1>Search Results</h1>
//       <input
//         value={searchText}
//         placeholder="Enter search key"
//         onChange={(e) => {
//           setSearchText(e.target.value);
//         }}
//       />

//       {loading && <h1 style={{ color: "purple" }}>Loading</h1>}

//       {searchText && (
//         <Container>
//           <Row>
//             {searchResults.length > 0 ? (
//               searchResults.map((result, i) => (
//                 <Col key={i} lg={4} md={6} sm={12}>
//                   {role === "ADMIN" ? (
//                     // Render all results for ADMIN
//                     <RenderResult result={result} />
//                   ) : role === "DOCTOR" ? (
//                     // Render specific results for DOCTOR
//                     <RenderDoctorResult result={result} />
//                   ) : role === "PATIENT" ? (
//                     // Render specific results for PATIENT
//                     <RenderPatientResult result={result} />
//                   ) : !token ? (
//                     // Render specific results when no token
//                     <RenderNoTokenResult result={result} />
//                   ) : null}
//                 </Col>
//               ))
//             ) : (
//               <p>No results found</p>
//             )}
//           </Row>
//         </Container>
//       )}
//     </Container>
//   );
// };

// const RenderResult = ({ result }) => {
//   // Implement rendering logic for all roles
//   return (
//     <Card>
//       {/* Customize the Card content based on the type of result */}
//       <Card.Body>
//         <Card.Title>
//           {result.firstName} {result.lastName}
//         </Card.Title>
//         {/* Add more details as needed */}
//       </Card.Body>
//     </Card>
//   );
// };

// const RenderDoctorResult = ({ result }) => {
//   // Implement rendering logic for DOCTOR role
//   return (
//     <Card>
//       {/* Customize the Card content based on the type of result for DOCTOR */}
//       <Card.Body>
//         <Card.Title>
//           Dr. {result.firstName} {result.lastName}
//         </Card.Title>
//         {/* Add more details as needed */}
//       </Card.Body>
//     </Card>
//   );
// };

// const RenderPatientResult = ({ result }) => {
//   // Implement rendering logic for PATIENT role
//   return (
//     <Card>
//       {/* Customize the Card content based on the type of result for PATIENT */}
//       <Card.Body>
//         <Card.Title>
//           {result.firstName} {result.lastName}
//         </Card.Title>
//         {/* Add more details as needed */}
//       </Card.Body>
//     </Card>
//   );
// };
