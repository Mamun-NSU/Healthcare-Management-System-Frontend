import { Button, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const MedicineListTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const csvHeaders = [
    { label: "Medicine ID", key: "medicineId" },
    { label: "Medicine Name", key: "medicineName" },
    { label: "Category", key: "category" },
    { label: "Dosage", key: "dosage" },
    { label: "Manufactured By", key: "manufacturedBy" },
    { label: "Expiration Date", key: "expirationDate" },
    { label: "Quantity", key: "quantity" },
    { label: "Side Effects", key: "sideEffects" },
    { label: "Expired", key: "expired" },
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:8400/medicines/all");
        setMedicines(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching medicines", error.response.data);
        setError("Error fetching medicines");
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const columns = [
    {
      title: "Medicine ID",
      dataIndex: "medicineId",
    },
    {
      title: "Medicine Name",
      dataIndex: "medicineName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
    },
    {
      title: "Manufactured By",
      dataIndex: "manufacturedBy",
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Side Effects",
      dataIndex: "sideEffects",
    },
    {
      title: "Expired",
      dataIndex: "expired",
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
        <CSVLink
          data={medicines}
          headers={csvHeaders}
          filename={"medicines.csv"}
        >
          <Button type="primary">Download as CSV</Button>
        </CSVLink>
      </div>
      <Typography.Title level={4}>Medicines List</Typography.Title>
      <Table
        columns={columns}
        dataSource={medicines}
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

export default MedicineListTable;
