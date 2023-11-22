import { useNavigate } from "react-router-dom";

const Quit = ({ change, userChoice, data }) => {
  const navigate = useNavigate();
  const handlePlayAgain = () => {
    change();
    navigate("/play", { state: { userChoice } });
    window.location.reload(true);
  };
  const handleQuit = () => {
    localStorage.removeItem("hscore");
    localStorage.removeItem("pcscore");
    localStorage.removeItem("tie");
    navigate("/");
  };
  return (
    <div className="quit">
      <div className="quit-screen">
        <p>Do you want to Quit?</p>
        <div className="quit-btn-container">
          <button className="quit-btn-pa" onClick={() => handlePlayAgain()}>
            Play Again
          </button>
          <button className="quit-btn-q" onClick={() => handleQuit()}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quit;
