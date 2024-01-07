import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAppointmentForm = ({ onClose, doctorInfo, day }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    doctorName: doctorInfo ? doctorInfo.doctorName : "",
    doctorId: doctorInfo ? doctorInfo.doctorId : "",
    date: day || "",
    time: "",
    serialNumber: "",
    problemDescription: "",
    appointmentType: doctorInfo ? doctorInfo.appointmentType : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("doctorInfo in AddAppointmentForm", doctorInfo);
  console.log("formData in AddAppointmentForm", formData);

  useEffect(() => {
    // If any of the pre-filled values are passed, update the form data
    if (doctorInfo && doctorInfo.doctorId) {
      setFormData((prevData) => ({
        ...prevData,
        doctorId: doctorInfo.doctorId,
      }));
    }
    if (doctorInfo && doctorInfo.doctorName) {
      setFormData((prevData) => ({
        ...prevData,
        doctorName: doctorInfo.doctorName,
      }));
    }
    if (day) {
      setFormData((prevData) => ({
        ...prevData,
        date: day,
      }));
    }
    if (doctorInfo && doctorInfo.appointmentType) {
      setFormData((prevData) => ({
        ...prevData,
        appointmentType: doctorInfo.appointmentType,
      }));
    }
  }, [doctorInfo, day]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8500/appointments/add";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Appointment booked successfully:", data);
        toast.success("Appointment added successfully");
        Navigate("/patientAppointment");
        onClose();
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        // Handle errors as needed
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDoctorName">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor's name"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDoctorId">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor's ID"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSerialNumber">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter serial number"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProblemDescription">
              <Form.Label>Problem Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter problem description"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* New Form Group for appointmentType */}
            <Form.Group controlId="formAppointmentType">
              <Form.Label>Appointment Type</Form.Label>
              <Form.Control
                as="select"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select appointment type
                </option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Book Appointment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAppointmentForm;
