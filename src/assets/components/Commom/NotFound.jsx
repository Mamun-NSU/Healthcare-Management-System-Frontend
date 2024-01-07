import '../../css/globalStyles.css';
import loddingImg from "../../images/loading.gif";
const NotFound = () => {
    return (
      <div className="myContainer">
      <h2 className="text-primary text-center">Page Not Found!!!</h2>
      <h4 className="text-danger text-center">Error 404</h4>
      <div className="flex items-center justify-center">
        <img className="w-100" src={loddingImg} alt="" />
      </div>
    </div>
    );
  };
  
  export default NotFound;