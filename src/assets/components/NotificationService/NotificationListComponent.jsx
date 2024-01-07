import { useEffect, useState } from "react";
import { Table, Typography, Space, Button } from "antd";
import axios from "axios";

const NotificationListComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications using the API endpoint and authorization token
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8390/notifications/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update state with the fetched data
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications", error.response.data);
        setError("Error fetching notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    try {
      // Send PUT request to the API endpoint for sending notifications
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8390/notifications/allow",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error sending notifications", error.response.data);
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Notification Type",
      dataIndex: "notificationType",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Notification List</Typography.Title>
      <Table
        columns={columns}
        dataSource={notifications}
        pagination={{ pageSize: 5 }}
      />
      <Button type="primary" onClick={handleSendNotification}>
        Send Notification To Users
      </Button>
    </Space>
  );
};

export default NotificationListComponent;
