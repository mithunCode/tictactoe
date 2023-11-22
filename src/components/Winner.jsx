/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Winner = ({ change, userChoice, winner }) => {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "15px" }}>
            {userChoice == winner ? "You Won" : "You Lost Against Pc"}
          </p>
          <p>
            {" "}
            <img src={`../src/assets/${winner}.png`} /> Takes the round
          </p>
        </div>
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

export default Winner;
