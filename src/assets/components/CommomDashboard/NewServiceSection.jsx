import { Container, Row, Col, Modal } from "react-bootstrap";
import iconDoctor from "../../img/services/icon_doctor1.png";
import iconHelpDesk from "../../img/services/icon_help_desk1.png";
import bloodImage from "../../img/services/blood.png";
import medBookImage from "../../img/services/icon_med_book_white.png";
import { Link } from "react-router-dom";

const NewServiceSection = () => {
  return (
    <Container
      className="bg-success my-3 text-white"
      style={{ padding: "0 15px" }}
    >
      <Row>
        <Col
          sm={3}
          xs={12}
          className="counter-col py-3 text-center"
          onClick={() =>
            (window.location.href = "http://localhost:5173/doctors")
          }
        >
          <Link to="/doctors"> </Link>
          <div className="separator_top"></div>
          <div className="teaser_box text-center transparent boxed same_height_col with_button">
            <div className="figure transparent">
              <img
                src={iconDoctor}
                alt="Departments"
                className="no-drag"
                draggable="false"
              />
            </div>
            <div className="content text-center with_button">
              <div className="hgroup">
                <h4 className="neutralize_links">Find Consultant</h4>
              </div>
            </div>
          </div>
          <div className="separator_bottom"></div>
        </Col>

        <Col
          sm={3}
          xs={12}
          className="counter-col py-3 text-center"
          onClick={() =>
            (window.location.href = "http://localhost:5173/doctors")
          }
          data-toggle="modal"
          data-target="#myModal"
        >
          <Link to="/doctors"> </Link>
          <div className="separator_top"></div>
          <div className="teaser_box text-center transparent boxed same_height_col with_button">
            <div className="figure transparent">
              <img
                src={iconHelpDesk}
                alt="Medical Services"
                className="no-drag"
                draggable="false"
              />
            </div>
            <div className="content text-center with_button">
              <div className="hgroup">
                <h4 className="neutralize_links">Make an appointment</h4>
              </div>
            </div>
          </div>
          <div className="separator_bottom"></div>
        </Col>

        <Col
          sm={3}
          xs={12}
          className="counter-col py-3 text-center"
          onClick={() => (window.location.href = "")}
        >
          <Link to="/doctors"> </Link>
          <div className="separator_top"></div>
          <div className="teaser_box text-center transparent boxed same_height_col with_button">
            <div className="figure transparent">
              <img
                src={bloodImage}
                alt="Find a doctor"
                className="no-drag"
                draggable="false"
              />
            </div>
            <div className="content text-center with_button">
              <div className="hgroup">
                <h4 className="neutralize_links">Blood Bank</h4>
              </div>
            </div>
          </div>
          <div className="separator_bottom"></div>
        </Col>

        <Col
          sm={3}
          xs={12}
          className="counter-col py-3 text-center"
          onClick={() =>
            (window.location.href = "http://localhost:5173/medicines")
          }
        >
          <Link to="/doctors"> </Link>
          <div className="separator_top"></div>
          <div className="teaser_box text-center transparent boxed same_height_col with_button">
            <div className="figure transparent">
              <img
                src={medBookImage}
                alt="Request an appointment"
                className="no-drag"
                draggable="false"
              />
            </div>
            <div className="content text-center with_button">
              <div className="hgroup">
                <h4 className="neutralize_links">Medicine Services</h4>
              </div>
            </div>
          </div>
          <div className="separator_bottom"></div>
        </Col>
      </Row>

      {/* Add the Modal component here if needed */}
      <Modal id="myModal" show={false} onHide={() => {}}>
        {/* Modal content goes here */}
      </Modal>
    </Container>
  );
};

export default NewServiceSection;
