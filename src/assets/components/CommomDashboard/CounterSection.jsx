import { Container, Row, Col } from "react-bootstrap";

import countDept from "../../img/count/count-dept.png";
import countDoc from "../../img/count/count-doc.png";
import countNurse from "../../img/count/count-nurse.png";
import countPat from "../../img/count/count-pat.png";
import axios from "axios";
import { useEffect, useState } from "react";

const CounterSection = () => {
  const token = localStorage.getItem("token");
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8200/patients/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPatientsCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching patients", error.response.data);
      });

    // Fetch data for Doctors
    axios
      .get("http://localhost:8300/doctors/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctorsCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching doctors", error.response.data);
      });
  }, []);

  return (
    <Container fluid className="my-3">
      <Row className="bg-success">
        <Col
          md={3}
          sm={6}
          xs={6}
          className="counter-col py-3 text-white text-center"
        >
          <img
            src={countDept}
            alt="Departments"
            className="no-drag"
            draggable="false"
          />
          <div className="count">
            <div className="start-count ff-p">15</div>
            <h4>Departments</h4>
          </div>
        </Col>
        <Col
          md={3}
          sm={6}
          xs={6}
          className="counter-col py-3 text-white text-center"
        >
          <img
            src={countDoc}
            alt="Expert Doctors"
            className="no-drag"
            draggable="false"
          />
          <div className="count">
            <div className="start-count ff-p">{doctorsCount}</div>
            <h4>Expert Doctors</h4>
          </div>
        </Col>
        <Col
          md={3}
          sm={6}
          xs={6}
          className="counter-col py-3 text-white text-center"
        >
          <img
            src={countNurse}
            alt="Trained Nurse"
            className="no-drag"
            draggable="false"
          />
          <div className="count">
            <div className="start-count ff-p">100</div>
            <h4>Medical Assistants</h4>
          </div>
        </Col>
        <Col
          md={3}
          sm={6}
          xs={6}
          className="counter-col py-3 text-center text-white border-none"
        >
          <img
            src={countPat}
            alt="Happy Patient"
            className="no-drag"
            draggable="false"
          />
          <div className="count">
            <div className="start-count ff-p">{patientsCount}</div>
            <h4>Happy Patients</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CounterSection;
