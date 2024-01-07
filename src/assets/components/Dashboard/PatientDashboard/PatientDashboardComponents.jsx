import {
  HeartOutlined,
  LineHeightOutlined,
  BarChartOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { Button, Modal, Form, Input, message } from "antd";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";

const UpdateWeightForm = ({ visible, onCancel, userId, token, reloadPage }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const response = await axios.post(
        `http://localhost:8600/progress/update/${userId}`,
        { currentWeight: values.currentWeight },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Weight updated successfully");
        reloadPage();
      }
    } catch (error) {
      console.error("Error updating weight:", error);
      message.error("Failed to update weight. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Update Current Weight"
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="currentWeight" label="Current Weight (kg)" noStyle>
          <Input type="number" placeholder="Enter your current weight" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateGoalForm = ({ visible, onCancel, userId, token, reloadPage }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const response = await axios.post(
        `http://localhost:8600/progress/update/${userId}`,
        { goalWeight: values.goalWeight },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Goal Weight updated successfully");
        reloadPage();
      }
    } catch (error) {
      console.error("Error updating weight:", error);
      message.error("Failed to update weight. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Update Current Weight"
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="goalWeight"
          label="Goal Weight (kg)"
          noStyle // Add this line to remove validation warning
        >
          <Input type="number" placeholder="Enter goal weight" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const PatientDashboardComponents = () => {
  const [healthData, setHealthData] = useState({});
  const [progressData, setProgressData] = useState(null);
  const [goalMesssage, setGoalMessage] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [updateWeightVisible, setUpdateWeightVisible] = useState(false);
  const [updateGoalVisible, setUpdateGoalVisible] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // const columns = [
  //   {
  //     title: "Doctor",
  //     dataIndex: "doctorName",
  //     key: "doctorName",
  //   },
  //   {
  //     title: "Problem Description",
  //     dataIndex: "problemDescription",
  //     key: "problemDescription",
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "appointmentDate",
  //     key: "appointmentDate",
  //     width: "120px",
  //   },
  //   {
  //     title: "Time",
  //     dataIndex: "appointmentTime",
  //     key: "appointmentTime",
  //   },
  //   {
  //     title: "Serial Number",
  //     dataIndex: "serialNumber",
  //     key: "serialNumber",
  //   },
  // ];

  const handleUpdateWeightClick = () => {
    setUpdateWeightVisible(true);
  };

  const handleUpdateWeightCancel = () => {
    setUpdateWeightVisible(false);
  };
  const handleUpdateGoalClick = () => {
    setUpdateGoalVisible(true);
  };

  const handleUpdateGoalCancel = () => {
    setUpdateGoalVisible(false);
  };

  const handlePageReload = () => {
    // Reload the page logic
    window.location.reload();
  };
  const upcomingAppointmentsArray = upcomingAppointments
    ? [upcomingAppointments]
    : [];

  useEffect(
    () => {
      const fetchHealthData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8200/health/find",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setHealthData(response.data);
        } catch (error) {
          console.error("Error fetching health data:", error);
          message.error(
            "No health data found. Please provide your health data."
          );
          // Handle errors as needed
        }
      };
      const fetchProgressData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8600/progress/get-by-id",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);

          setProgressData(response.data);
        } catch (error) {
          console.error("Error fetching progress data:", error);
        }
      };
      const fetchProgressCheck = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8600/progress/check/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data);

          setGoalMessage(response.data);
        } catch (error) {
          console.error("Error fetching progress check data:", error);
          // Handle errors as needed
        }
      };
      const fetchUpcomingAppointments = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:8500/appointments/patient",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setUpcomingAppointments(response.data);
        } catch (error) {
          console.error("Error fetching upcoming appointments:", error);
        }
      };
      fetchProgressCheck();
      fetchProgressData();
      fetchHealthData();
      fetchUpcomingAppointments();
    }
    // []
  );
  const diabetesStatusOptions = {
    title: "Diabetes Status",
    pieHole: 0.4,
  };

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <HeartOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={<span style={{ color: "black" }}>Heart Rate</span>}
            value={healthData.heartRate + " bpm"}
          />

          <DashboardCard
            icon={
              <LineHeightOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={<span style={{ color: "black" }}>Height</span>}
            value={healthData.height + " cm"}
          />

          <DashboardCard
            icon={
              <NumberOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={<span style={{ color: "black" }}>Weight</span>}
            value={healthData.weight + " kg"}
          />

          <Chart
            chartType="PieChart"
            width="300px"
            height="200px"
            data={[
              ["Diabetes Status", "Count"],
              ["Yes", healthData.diabetesStatus === "YES" ? 1 : 0],
              ["No", healthData.diabetesStatus === "NO" ? 1 : 0],
            ]}
            options={diabetesStatusOptions}
          />

          <DashboardCard
            icon={
              <BarChartOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={<span style={{ color: "black" }}>Blood Pressure</span>}
            value={`High: ${healthData.highBloodPressure} mmHg, \n
             Low: ${healthData.lowBloodPressure} mmHg`}
          />
        </Space>
        <div style={{ display: "flex" }}>
          {progressData && (
            <>
              <Chart
                chartType="ColumnChart"
                width="65%"
                height="300px"
                data={[
                  ["Metric", "Value", { role: "style" }],
                  ["Current Weight", progressData.currentWeight, "blue"],
                  ["Goal Weight", progressData.goalWeight, "green"],
                ]}
                options={{
                  title: "Weight Progress",
                  vAxis: { title: "Weight", minValue: 0 },
                  hAxis: { title: "Metric" },
                  legend: { position: "none" },
                }}
              />
            </>
          )}
          <div>
            <h3>Upcoming Appointment</h3>
            {upcomingAppointmentsArray.length > 0 ? (
              <Row gutter={16}>
                {upcomingAppointmentsArray.map((appointment) => (
                  <Col span={10} key={appointment.appointmentId}>
                    <Card
                      title={appointment.doctorName}
                      style={{ width: "200%" }}
                    >
                      <p>
                        <strong>Problem Description:</strong>{" "}
                        {appointment.problemDescription}
                      </p>
                      <p>
                        <strong>Date:</strong> {appointment.appointmentDate}
                      </p>
                      <p>
                        <strong>Time:</strong> {appointment.appointmentTime}
                      </p>
                      <p>
                        <strong>Serial Number:</strong>{" "}
                        {appointment.serialNumber}
                      </p>
                      <p>
                        <strong>Appointment Type:</strong>{" "}
                        {appointment.appointmentType}
                      </p>
                      {
                        // appointment.appointmentType === "ONLINE" &&
                        <Link to={`/join-call/${appointment.appointmentId}`}>
                          <Button type="primary">JOIN CALL</Button>
                        </Link>
                      }
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No upcoming appointments</p>
            )}
          </div>
        </div>
        <p style={{ fontWeight: "bold", color: "green", fontSize: "16px" }}>
          Goal Progress: {goalMesssage.message}
        </p>
        <div style={{ display: "flex" }}>
          <div>
            <Button type="primary" onClick={handleUpdateWeightClick}>
              Update Current Weight
            </Button>
            <UpdateWeightForm
              visible={updateWeightVisible}
              onCancel={handleUpdateWeightCancel}
              userId={userId}
              token={token}
              reloadPage={handlePageReload}
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Button type="primary" onClick={handleUpdateGoalClick}>
              Update Goal Weight
            </Button>
            <UpdateGoalForm
              visible={updateGoalVisible}
              onCancel={handleUpdateGoalCancel}
              userId={userId}
              token={token}
              reloadPage={handlePageReload}
            />
          </div>
        </div>
      </Space>
    </div>
  );
};
function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
export default PatientDashboardComponents;
