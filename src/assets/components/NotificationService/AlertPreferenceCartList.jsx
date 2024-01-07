import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AlertPreferenceCart from "./AlertPreferenceCart";

const AlertPreferenceCartList = () => {
  const [alertPreferences, setAlertPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAlertPreferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8390/notifications/all"
        );
        const allAlertPreferences = response.data;
        const userAlertPreferences = allAlertPreferences.filter(
          (preference) => preference.userId === userId
        );
        setAlertPreferences(userAlertPreferences);
        setLoading(false);
        console.log("userAlertPreferences", userAlertPreferences);
        console.log("allAlertPreferences", allAlertPreferences);
      } catch (error) {
        console.error("Error fetching alert preferences:", error);
        setAlertPreferences([]);
        setLoading(false);
      }
    };

    fetchAlertPreferences();
  }, [userId]);

  console.log("alertPreferences data:", alertPreferences);

  return (
    <Container>
      <h1>Alert Preferences List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row>
          {alertPreferences.map((preference, i) => (
            <Col key={i} lg={4} md={6} sm={12}>
              <AlertPreferenceCart preference={preference} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AlertPreferenceCartList;
