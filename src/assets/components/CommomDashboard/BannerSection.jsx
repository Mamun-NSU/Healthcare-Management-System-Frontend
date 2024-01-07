import { Container, Row, Col, Button } from "react-bootstrap";

import doctorBg from "../../img/bg-doctor.png";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <div className="bg-light">
      <div className="page-section pb-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="py-3 wow fadeInUp">
              <h1>
                Welcome to Your Health <br /> Center
              </h1>
              <p className="text-grey mb-4">
                At Harmony Health, we prioritize your well-being with a
                commitment to exceptional healthcare. Our dedicated team of
                professionals is here to provide compassionate and innovative
                solutions tailored to your needs. Whether you are seeking
                routine care or specialized services, we strive to ensure your
                journey to wellness is comfortable and supported. Experience a
                new standard of personalized healthcare at Harmony Health, where
                your health is our top priority. Embrace a healthier future with
                us!
              </p>
              <Link to="/medicines">
                <Button variant="success">Learn More</Button>
              </Link>
            </Col>
            <Col lg={6} className="wow fadeInRight" data-wow-delay="400ms">
              <div className="img-place custom-img-1">
                <img src={doctorBg} alt="Doctor Background" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BannerSection;
