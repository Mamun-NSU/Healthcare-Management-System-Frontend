import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Space, Typography, Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";

const DoctorDashboardComponents = () => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [upcomingSchedule, setUpcomingSchedule] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // Fetch doctor information
    axios
      .get(`http://localhost:8300/doctors/get-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctorInfo(response.data);
        console.log("Doctor data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor information:", error);
      });

    // Fetch upcoming schedule
    axios
      .get(`http://localhost:8500/doctors/schedule/get-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpcomingSchedule(response.data);
        console.log("schedule data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming schedule:", error);
      });

    // Fetch upcoming appointments
    axios
      .get(`http://localhost:8500/appointments/doctor/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpcomingAppointments(response.data);
        console.log("appointments data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming appointments:", error);
      });
  }, []);

  const scheduleColumns = [
    {
      title: "Available Day",
      dataIndex: "availableDay",
      key: "availableDay",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Time Per Patient",
      dataIndex: "timePerPatient",
      key: "timePerPatient",
    },
    {
      title: "Patient Numbers",
      dataIndex: "patientNumbers",
      key: "patientNumbers",
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Doctor Dashboard</Typography.Title>

      <Space direction="horizontal">
        <DoctorInfoCard doctorInfo={doctorInfo} />
        <UpcomingScheduleTable
          scheduleData={upcomingSchedule}
          columns={scheduleColumns}
        />
      </Space>

      <UpcomingAppointmentsCard appointments={upcomingAppointments} />
    </Space>
  );
};

const DoctorInfoCard = ({ doctorInfo }) => {
  return (
    <Card title="Doctor Information">
      <img
        src={doctorInfo.doctorImage}
        alt="Doctor"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <p>
        <strong>Name:</strong> Dr. {doctorInfo.dfirstName}{" "}
        {doctorInfo.dlastName}
      </p>
      {/* <p>
        <strong>Email:</strong> {doctorInfo.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {doctorInfo.phoneNumber}
      </p>
      <p>
        <strong>Gender:</strong> {doctorInfo.gender}
      </p> */}
      <p>
        <strong>Qualifications:</strong>{" "}
        {doctorInfo.qualifications &&
          doctorInfo.qualifications.map((qualification) => (
            <Tag key={qualification}>{qualification}</Tag>
          ))}
      </p>
      <p>
        <strong>Specialities:</strong>{" "}
        {doctorInfo.specialities &&
          doctorInfo.specialities.map((speciality) => (
            <Tag key={speciality}>{speciality}</Tag>
          ))}
      </p>
    </Card>
  );
};

const UpcomingScheduleTable = ({ scheduleData, columns }) => {
  return (
    <Card title="Upcoming Schedule">
      <Table dataSource={[scheduleData]} columns={columns} pagination={false} />
    </Card>
  );
};

const UpcomingAppointmentsCard = ({ appointments }) => {
  return (
    <Card title="Upcoming Appointments">
      {appointments.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {appointments.map((appointment) => (
            <Card
              key={appointment.appointmentId}
              style={{
                width: "30%",
                marginBottom: "10px",
                border: "1px solid #d9d9d9",
                borderRadius: "8px",
                transition: "border 0.3s, box-shadow 0.3s",
              }}
              hoverable
            >
              <p>
                <strong>Patient Name:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Appointment Date:</strong> {appointment.appointmentDate}
              </p>
              <p>
                <strong>Appointment Time:</strong> {appointment.appointmentTime}
              </p>
              <p>
                <strong>Appointment Type:</strong> {appointment.appointmentType}
              </p>
              <p>
                <strong>Serial Number:</strong> {appointment.serialNumber}
              </p>
              {
                // appointment.appointmentType === "ONLINE" &&
                <Link to={`/join-call/${appointment.appointmentId}`}>
                  <Button type="primary">JOIN CALL</Button>
                </Link>
              }
            </Card>
          ))}
        </div>
      ) : (
        <p>No upcoming appointments</p>
      )}
    </Card>
  );
};

export default DoctorDashboardComponents;
