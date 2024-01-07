import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const JoinCallPage = () => {
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const appID = 91735966;
    const serverSecret = "7b7df22e5fde0bed63f274c769bb24d7";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter your name"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <>
      <h6> Click join to enter in your online appointment</h6>
      <div style={{ marginLeft: "100px" }} ref={myMeeting} />
    </>
  );
};

export default JoinCallPage;
