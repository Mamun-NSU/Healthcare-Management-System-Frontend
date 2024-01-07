import { useState, useEffect } from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import axios from "axios";

const FindNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8390/notifications/user/${userId}/status/unread`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications", error.response.data);
    }
  };

  const handleNotificationClick = () => {
    fetchNotifications();
    setDrawerVisible(true);
  };

  const handleDrawerClose = async () => {
    // Update notification status to "read" when the Drawer is closed
    try {
      await axios.put(
        `http://localhost:8390/notifications/update/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating notification status", error.response.data);
    }

    setDrawerVisible(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="AppHeader">
      <Typography.Title className="text-success">
        Patient Dashboard
      </Typography.Title>
      <Space>
        <Badge count={5} dot>
          <MailOutlined style={{ fontSize: "24px" }} />
        </Badge>
        <Badge count={notifications.length}>
          <BellFilled
            style={{ fontSize: "24px" }}
            onClick={handleNotificationClick}
          />
        </Badge>
      </Space>

      <Drawer
        title="Notifications"
        placement="right"
        closable={true}
        onClose={handleDrawerClose}
        visible={drawerVisible}
      >
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.message} />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};

export default FindNotifications;
