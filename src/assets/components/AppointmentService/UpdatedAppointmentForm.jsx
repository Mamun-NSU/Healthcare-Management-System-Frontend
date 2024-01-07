import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstanceAppointmentService } from '../../utils/axiosInstanceHMSApp';

const UpdatedAppointmentForm = ({ appointment, onUpdate }) => {
  const navigate = useNavigate();
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [, setError] = useState();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment({ ...updatedAppointment, [name]: value });
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axiosInstanceAppointmentService
      .put(`/doctors/update-appointment`, updatedAppointment)
      .then((resp) => {
        console.log('Appointment Updated:', resp);
        setIsUpdated(true);
        onUpdate(updatedAppointment);
        toast.success('Appointment Updated successfully!!!');
        navigate(`/appointments`);
      })
      .catch((error) => {
        console.log('Error', error);
        setError(error);
        toast.success('Appointment Updated successfully!!!');
        navigate(`/appointments`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setUpdatedAppointment(appointment);
  }, [appointment]);

  return (
    <Form onSubmit={handleUpdateAppointment}>
      <Form.Group>
        <Form.Label>Time Per Patient</Form.Label>
        <Form.Control
          type="number"
          name="timePerPatient"
        //   value={updatedAppointment.timePerPatient}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Patient Numbers</Form.Label>
        <Form.Control
          type="number"
          name="patientNumbers"
        //   value={updatedAppointment.patientNumbers}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Appointment'}
      </Button>

      {isUpdated && (
        <div style={{ color: 'green', marginTop: '20px' }}>
          Appointment Updated Successfully
        </div>
      )}
      <ToastContainer />
    </Form>
  );
};

export default UpdatedAppointmentForm;
