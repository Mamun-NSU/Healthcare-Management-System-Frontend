import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const PatientListTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const csvHeaders = [
    { label: "Patient ID", key: "patientId" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Gender", key: "gender" },
    { label: "Phone Number", key: "phoneNo" },
    { label: "Patient Image", key: "patientImage" },
    { label: "Age", key: "age" },
    { label: "Blood Group", key: "bloodGroup" },
    { label: "Date of Birth", key: "dateOfBirth" },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8200/patients/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients", error.response.data);
        setError("Error fetching patients");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "patientId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
    },
    {
      title: "Patient Image",
      dataIndex: "patientImage",
      render: (patientImage) => (
        <img
          src={patientImage}
          alt="Patient"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Space size={15} direction="vertical">
      <div style={{ marginTop: "10px" }}>
        <CSVLink data={patients} headers={csvHeaders} filename={"patients.csv"}>
          <Button type="primary">Download as CSV</Button>
        </CSVLink>
      </div>
      <Typography.Title level={4}>Patients List</Typography.Title>
      <Table
        columns={columns}
        dataSource={patients}
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

export default PatientListTable;
