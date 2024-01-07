import { Card } from "react-bootstrap";


const DoctorCard = ({ doctor }) => {
    return (
            <Card>
                <Card.Img variant="bottom" src={doctor.imageUrl} alt={doctor.name} />
              <Card.Body>
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Subtitle className="text-muted">{doctor.specialization}</Card.Subtitle>
                <Card.Text>{doctor.description}</Card.Text>
                <Card.Link href={doctor.link} target="_blank">
                  <i className="pe-7s-link"></i>
                </Card.Link>
              </Card.Body>
            </Card>
    );
  };

export default DoctorCard;
