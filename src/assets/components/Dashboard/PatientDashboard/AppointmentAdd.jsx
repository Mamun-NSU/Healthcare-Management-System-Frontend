import { useState, useEffect } from "react";
import { Form, Button, Select, Input } from "antd";
import axios from "axios";

const { Option } = Select;

const AppointmentAdd = () => {
  // State to manage form inputs
  const [problemDescription, setProblemDescription] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [slotOptions, setSlotOptions] = useState([]);
  const [appointmentType, setAppointmentType] = useState("");
  const [fetchedAppointmentType, setFetchedAppointmentType] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");

  // Dummy data for dropdowns
  const specialities = ["Cardiologist", "Dermatologist", "Orthopedics"];
  const slots = ["10:00 AM", "2:00 PM", "4:00 PM"];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      // Create the AddAppointmentDTO based on the form values
      const appointmentData = {
        doctorName: selectedDoctor
          ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}`
          : "",
        doctorId: selectedDoctor ? selectedDoctor.doctorId : "",
        serialNumber: selectedSlot,
        problemDescription,
      };

      // Send the appointment data to the server
      const response = await axios.post(
        "http://localhost:8500/appointments/add",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment added successfully:", response.data);

      // Add any logic you need to handle successful submission
    } catch (error) {
      console.error("Error adding appointment", error.response.data);

      // Add any logic you need to handle errors
    }
  };

  // Function to fetch doctors based on speciality
  const fetchDoctors = async (specialities) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8300/doctors/filter",
        { specialities },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoctorOptions(response.data);
    } catch (error) {
      console.error("Error fetching doctors", error.response.data);
    }
  };

  const fetchDoctorSchedule = async (doctorId) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8500/doctors/schedule/get-by-id/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching doctor schedule", error.response.data);
      return null;
    }
  };

  // Update your onChange handler for doctors dropdown
  const handleDoctorChange = async (value) => {
    try {
      const selectedDoctor = doctorOptions.find(
        (doctor) => `${doctor.firstName} ${doctor.lastName}` === value
      );

      setSelectedDoctor(selectedDoctor);
      setSelectedSlot("");

      // Fetch the doctor's schedule
      const doctorSchedule = await fetchDoctorSchedule(selectedDoctor.doctorId);
      if (!doctorSchedule || doctorSchedule.patientNumbers === 0) {
        // Set a message when the doctor has no upcoming schedule
        setScheduleMessage("Doctor has no upcoming schedule");
        return;
      }
      setScheduleMessage("");

      if (doctorSchedule) {
        // Extract relevant data
        const {
          patientNumbers,
          startTime,
          timePerPatient,
          appointmentType: fetchedAppointmentType,
        } = doctorSchedule;
        setFetchedAppointmentType(fetchedAppointmentType);

        // Calculate total duration for all patients
        const totalDuration = patientNumbers * timePerPatient;

        // Parse start time to get initial hour and minute
        const [startHour, startMinute] = startTime.split(":");
        let currentHour = parseInt(startHour, 10);
        let currentMinute = parseInt(startMinute, 10);

        // Generate an array of slot options
        const slotOptions = Array.from(
          { length: patientNumbers },
          (_, index) => {
            const slotNumber = index + 1;

            // Calculate slot time based on timePerPatient
            const slotHour = Math.floor(currentMinute / 60) + currentHour;
            const slotMinute = currentMinute % 60;

            // Format time
            const formattedTime = `${String(slotHour).padStart(
              2,
              "0"
            )}:${String(slotMinute).padStart(2, "0")}`;

            // Update current time for the next iteration
            currentMinute += timePerPatient;

            return {
              label: `${slotNumber} - Time ${formattedTime}`,
              value: `${slotNumber}`,
            };
          }
        );
        const upcomingAppointments = await fetchUpcomingAppointments(
          selectedDoctor.doctorId
        );

        // Filter out occupied slots based on serial numbers
        const availableSlots = slotOptions.filter(
          (slot) =>
            !upcomingAppointments.some(
              (appointment) =>
                appointment.serialNumber === parseInt(slot.value, 10)
            )
        );
        setAppointmentType(fetchedAppointmentType);
        setSlotOptions(availableSlots);
      }
    } catch (error) {
      console.error("Error handling doctor change", error);
    }
  };
  const fetchUpcomingAppointments = async (doctorId) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8500/appointments/doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching upcoming appointments",
        error.response.data
      );
      return [];
    }
  };

  // Effect to fetch doctors when speciality changes
  useEffect(() => {
    if (selectedSpeciality) {
      fetchDoctors(selectedSpeciality);
    }
  }, [selectedSpeciality]);

  return (
    <div
      className="mt-5"
      style={{
        width: "700px",
        marginLeft: "150px",
        marginTop: "50px",
        background: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "15px" }}>
        <h2 className="mb-4">Patient Appointment</h2>
        <Form style={{ marginBottom: "5px", marginTop: "20px" }}>
          {/* Problem Description */}
          <Form.Item label="Problem Description">
            <Input.TextArea
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              required
            />
          </Form.Item>

          {/* Speciality Dropdown */}
          <div style={{ padding: "30px" }}>
            <Form.Item label="Select Speciality">
              <Select
                value={selectedSpeciality}
                onChange={(value) => {
                  setSelectedSpeciality(value);
                  setSelectedDoctor("");
                  setSelectedSlot("");
                }}
                placeholder="Choose..."
                required
              >
                {specialities.map((speciality) => (
                  <Option key={speciality} value={speciality}>
                    {speciality}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* Doctor dropdown */}
            <Form.Item label="Select Doctor">
              <Select
                value={
                  selectedDoctor
                    ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}`
                    : ""
                }
                onChange={handleDoctorChange}
                placeholder="Choose..."
                required
              >
                {doctorOptions.map((doctor) => (
                  <Option
                    key={doctor.doctorId}
                    value={`${doctor.firstName} ${doctor.lastName}`}
                  >
                    {`${doctor.firstName} ${doctor.lastName}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {scheduleMessage && <div>{scheduleMessage}</div>}
            {/* Appointment Type */}
            <Form.Item label="Appointment Type">
              <Select
                value={appointmentType}
                onChange={(value) => setAppointmentType(value)}
                placeholder="Choose..."
                required
              >
                <Option value="ONLINE">ONLINE</Option>
                <Option value="OFFLINE">OFFLINE</Option>
              </Select>
            </Form.Item>

            {/* Slot Dropdown */}
            <Form.Item label="Select Slot">
              {appointmentType === fetchedAppointmentType ? (
                <Select
                  value={selectedSlot}
                  onChange={(value) => setSelectedSlot(value)}
                  placeholder="Choose..."
                  required
                >
                  {slotOptions.map((slot) => (
                    <Option key={slot.value} value={slot.value}>
                      {slot.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <p>
                  Please select a matching appointment type to view available
                  slots.
                </p>
              )}
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "5px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AppointmentAdd;
