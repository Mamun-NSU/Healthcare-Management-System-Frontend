import "../../css/globalStyles.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Contact Information</h3>
            <p>
              For inquiries and support, please contact us at:
              <br />
              Email: contact@hms.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-md-12">
            <p>&copy; {new Date().getFullYear()} Healthcare Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
