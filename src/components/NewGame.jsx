import toast, { Toaster } from "react-hot-toast";
import o from "../assets/bo.png";
import bwx from "../assets/bwX.png";
import bwo from "../assets/o.png";
import x from "../assets/X.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const navigate = useNavigate();
  const [userChoice, setuserChoice] = useState("");

  const handleClick = () => {
    if (userChoice == "") {
      toast("Please Select Player");
      return;
    }
    navigate("/play", { state: { userChoice } });
  };

  return (
    <section className="main-container">
      <div>
        <Toaster
          toastOptions={{ className: "toast" }}
          position="top-right"
          reverseOrder={false}
        />
      </div>

      <div>
        <p className="title">
          <img src={x} alt="X" width="20px" />
          <img src={o} alt="O" width="20px" />
        </p>
      </div>
      <div className="pick-container">
        <p>PICK PLAYER </p>
        <div className="btn-container">
          <button
            className="btnX"
            onClick={() => {
              toast("You Selected X ");
              setuserChoice("x");
              document.querySelector(".btnO").classList.remove("selected");
              document.querySelector(".btnX").classList.add("selected");
            }}
          >
            <img src={bwx} alt="X" width="20px" />
          </button>
          <button
            className="btnO"
            onClick={() => {
              toast("You Selected O ");
              setuserChoice("o");
              document.querySelector(".btnX").classList.remove("selected");
              document.querySelector(".btnO").classList.add("selected");
            }}
          >
            <img src={bwo} alt="O" width="20px" />
          </button>
        </div>
      </div>
      <div className="newgame" onClick={() => handleClick()}>
        NEW GAME ( VS CPU )
      </div>
      <div className="newgame-h">NEW GAME ( VS HUMAN ) Coming soon</div>
      <div className="invite" onClick={() => toast("Invite Link Copied")}>
        Invite Your Friends
      </div>
    </section>
  );
};

export default NewGame;
