import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

import { CSVLink } from "react-csv";

const DoctorsListTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const csvHeaders = [
    { label: "Doctor ID", key: "doctorId" },
    { label: "First Name", key: "dfirstName" },
    { label: "Last Name", key: "dlastName" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Image Path", key: "doctorImage" },
    { label: "Gender", key: "dgender" },
    { label: "Specialities", key: "specialities" },
    { label: "Qualifications", key: "qualifications" },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8300/doctors/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors", error.response.data);
        setError("Error fetching doctors");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const columns = [
    {
      title: "Doctor ID",
      dataIndex: "doctorId",
    },
    {
      title: "First Name",
      dataIndex: "dfirstName",
    },
    {
      title: "Last Name",
      dataIndex: "dlastName",
    },

    {
      title: "Image",
      dataIndex: "doctorImage",
      render: (doctorImage) => (
        <img
          src={doctorImage}
          alt="Patient"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Specialities",
      dataIndex: "specialities",
      render: (specialities) => specialities.join(", "),
    },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
      render: (qualifications) => qualifications.join(", "),
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
        <CSVLink data={doctors} headers={csvHeaders} filename={"doctors.csv"}>
          <Button type="primary">Download as CSV</Button>
        </CSVLink>
      </div>
      <Typography.Title level={4}>Doctors List</Typography.Title>
      <Table
        columns={columns}
        dataSource={doctors}
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

export default DoctorsListTable;
