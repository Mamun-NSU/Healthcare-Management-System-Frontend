import CounterSection from "./CounterSection";
import DoctorList from "./DoctorList";
import NewServiceSection from "./NewServiceSection";
import BannerSection from "./BannerSection";

const UpdateHomePage = () => {
  return (
    <div>
      <BannerSection />
      <NewServiceSection />
      <DoctorList />
      <CounterSection />
    </div>
  );
};
export default UpdateHomePage;
