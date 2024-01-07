import { useState } from "react";
import { Form, Input, Button, Card, Spin, Modal } from "antd";
import axios from "axios";

const CDSSPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log(values);

      const response = await axios.post(
        "http://localhost:8800/reports/get-support",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);

      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching data", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setResult(null);
  };

  return (
    <div
      style={{
        width: "600px",
        marginLeft: "250px",
        marginTop: "10px",
        background: "white",
        height: "600px",
      }}
    >
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      )}
      <Modal
        title="Clinical Data Analysis Results"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {result && (
          <Card>
            <p>
              <strong>Diagnoses:</strong> {result.diagnoses}
            </p>
            <p>
              <strong>Treatment Plan:</strong> {result.treatmentPlan}
            </p>
            <p>
              <strong>Medication:</strong> {result.medication}
            </p>
          </Card>
        )}
      </Modal>
      <Form
        onFinish={onFinish}
        layout="vertical"
        style={{ padding: "50px" }}
        name="cdssForm"
        initialValues={{ symptoms: "High Fever, Cough, Fatigue" }}
      >
        <h1 className="text-success" style={{ textAlign: "center" }}>
          Clinical Data Analysis
        </h1>
        <p
          className="text-info"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          An Advanced Automated Clinical Data Analysis Service
        </p>

        <Form.Item label="High Blood Pressure" name="highBP">
          <Input type="number" step="0.1" />
        </Form.Item>
        <Form.Item label="Low Blood Pressure" name="lowBP">
          <Input type="number" step="0.1" />
        </Form.Item>
        <Form.Item label="Heart Rate" name="heartRate">
          <Input type="number" step="0.1" />
        </Form.Item>
        <Form.Item label="Symptoms" name="symptoms">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CDSSPage;
