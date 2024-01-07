import { useEffect, useState } from "react";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import {
  UserOutlined, // For Patients
  UsergroupAddOutlined, // For Doctors
  MedicineBoxOutlined, // For Medicine
  ToolOutlined, // For Equipment
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import axios from "axios";
import { Chart } from "react-google-charts";

const AdminDashboardComponents = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [malePatientsCount, setMalePatientsCount] = useState(0);
  const [femalePatientsCount, setFemalePatientsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const [syrupMedicineCount, setSyrupMedicineCount] = useState(0);
  const [tabletMedicineCount, setTabletMedicineCount] = useState(0);
  const [capsuleMedicineCount, setCapsuleMedicineCount] = useState(0);
  const [dropsMedicineCount, setDropsMedicineCount] = useState(0);
  const [suppositoriesMedicineCount, setSuppositoriesMedicineCount] =
    useState(0);
  const [topicalMedicineCount, setTopicalMedicineCount] = useState(0);
  const [inhalerMedicineCount, setInhalerMedicineCount] = useState(0);
  const [injectionsMedicineCount, setInjectionsMedicineCount] = useState(0);

  // Repeat the above pattern for other categories

  const genderData = [
    ["Gender", "Count", { role: "style" }],
    ["Male", malePatientsCount, "blue"],
    ["Female", femalePatientsCount, "pink"],
  ];
  const medicineCategoryData = [
    ["Category", "Count", { role: "style" }],
    ["Syrup", syrupMedicineCount, "silver"],
    ["Tablet", tabletMedicineCount, "gold"],
    ["Capsule", capsuleMedicineCount, "cyan"],
    ["Drops", dropsMedicineCount, "orange"],
    ["Suppositories", suppositoriesMedicineCount, "grey"],
    ["Topical", topicalMedicineCount, "red"],
    ["Inhaler", inhalerMedicineCount, "yellow"],
    ["Injections", injectionsMedicineCount, "purple"],
    // Repeat the above pattern for other categories
  ];

  //   const options = {
  //     title: "No of Male and Female Patients",
  //     legend: { position: "none" },
  //   };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch data for Patients
    axios
      .get("http://localhost:8200/patients/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPatientsCount(response.data.length);
        const malePatients = response.data.filter(
          (patient) => patient.gender === "MALE"
        );
        const femalePatients = response.data.filter(
          (patient) => patient.gender === "FEMALE"
        );

        setMalePatientsCount(malePatients.length);
        setFemalePatientsCount(femalePatients.length);
      })
      .catch((error) => {
        console.error("Error fetching patients", error.response.data);
      });

    axios
      .get("http://localhost:8600/posts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostsCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts", error.response.data);
      });

    // Fetch data for Reviews
    axios
      .get("http://localhost:8600/reviews/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviewsCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching reviews", error.response.data);
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

    // Fetch data for Medicine
    axios
      .get("http://localhost:8400/medicines/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMedicineCount(response.data.length);
        // Count medicines for each category
        const syrupMedicines = response.data.filter(
          (medicine) => medicine.category === "SYRUP"
        );
        const tabletMedicines = response.data.filter(
          (medicine) => medicine.category === "TABLET"
        );
        const capsuleMedicines = response.data.filter(
          (medicine) => medicine.category === "CAPSULE"
        );
        const dropsMedicines = response.data.filter(
          (medicine) => medicine.category === "DROPS"
        );
        const suppositoriesMedicines = response.data.filter(
          (medicine) => medicine.category === "SUPPOSITORIES"
        );
        const topicalMedicines = response.data.filter(
          (medicine) => medicine.category === "TOPICAL"
        );
        const inhalerMedicines = response.data.filter(
          (medicine) => medicine.category === "INHALER"
        );
        const injectionsMedicines = response.data.filter(
          (medicine) => medicine.category === "INJECTIONS"
        );
        // Repeat the above pattern for other categories

        setSyrupMedicineCount(syrupMedicines.length);
        setTabletMedicineCount(tabletMedicines.length);
        setCapsuleMedicineCount(capsuleMedicines.length);
        setDropsMedicineCount(dropsMedicines.length);
        setSuppositoriesMedicineCount(suppositoriesMedicines.length);
        setTopicalMedicineCount(topicalMedicines.length);
        setInhalerMedicineCount(inhalerMedicines.length);
        setInjectionsMedicineCount(injectionsMedicines.length);
        // Set counts for other categories
      })
      .catch((error) => {
        console.error("Error fetching medicines", error.response.data);
      });

    // Fetch data for Equipment
    axios
      .get("http://localhost:8400/equipment/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEquipmentCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching medical equipment", error.response.data);
      });
  }, []);
  // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Space size={22} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <UsergroupAddOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Patients"}
            value={patientsCount}
          />
          <DashboardCard
            icon={
              <MedicineBoxOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Medicines"}
            value={medicineCount}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Doctors"}
            value={doctorsCount}
          />
          <DashboardCard
            icon={
              <ToolOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Medical Equipments"}
            value={equipmentCount}
          />
          <DashboardCard
            icon={
              <MessageOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Posts"}
            value={postsCount}
          />
          <DashboardCard
            icon={
              <StarOutlined
                style={{
                  color: "gold",
                  backgroundColor: "rgba(255,215,0,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                  border: "2px solid black",
                }}
              />
            }
            title={"Total Reviews"}
            value={reviewsCount}
          />
        </Space>
        <div style={{ display: "flex" }}>
          <Chart
            chartType="ColumnChart"
            width="95%"
            height="250px"
            data={genderData}
          />
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={medicineCategoryData}
          />
        </div>
      </Space>
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ border: "2px solid blue" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic style={{ color: "black" }} title={title} value={value} />
      </Space>
    </Card>
  );
}

export default AdminDashboardComponents;
