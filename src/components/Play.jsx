import { useLocation, useNavigate } from "react-router-dom";
import bwo from "../assets/bo.png";
import x from "../assets/X.png";
import bwx from "../assets/bwX.png";
import o from "../assets/O.png";
import retry from "../assets/retry.png";
import Quit from "./Quit";
import { useEffect, useState } from "react";
import Winner from "./Winner";
import Tie from "./Tie";

const Play = () => {
  const [turns, setTurns] = useState(false);
  const [showQuit, setshowQuit] = useState(false);
  const [winner, setWinner] = useState(false);
  const [checktie, setchecktie] = useState(false);
  const { state } = useLocation();
  const [userChoice, setUserChoice] = useState(state.userChoice);
  const [data, setdata] = useState(Array.from(Array(9).fill("")));
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winnerC, setWinnerC] = useState("");
  let h = Number(localStorage.getItem("hscore"));
  let p = Number(localStorage.getItem("pcscore"));
  let t = Number(localStorage.getItem("tie")) || 0;
  const [hscore, sethscore] = useState(h);
  const [pcscore, setpcscore] = useState(p);
  const [tie, setTie] = useState(t);

  let pcTurn = userChoice == "x" ? "O" : "X";
  let turn = userChoice == "x" ? "X" : "O";

  const tieCheck = (data) => {
    const areAllSquaresFilled = data.every((squ) => squ !== "");
    if (areAllSquaresFilled && !winner) {
      setTie((prev) => prev + 1);
      localStorage.setItem("tie", tie + 1);
      setchecktie(true);
    }
  };

  function getCPUTurn() {
    const emptyIndexes = [];
    data.forEach((row, i) => {
      if (row === "") {
        emptyIndexes.push(i);
      }
    });
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  }
  const cpuTurn = () => {
    if (lock) {
      return 0;
    }
    let x = getCPUTurn();
    setWinnerC(pcTurn);

    data[x] = pcTurn;
    setCount((prev) => prev + 1);
    setTurns(false);
    setWinner && tieCheck(data);
    calculateWinner(data, winnerC);
  };

  turns && cpuTurn();

  const handleClick = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 == 0) {
      // e.target.innerHTML = `<img src="/src/assets/${turn}.png" />`;
      data[num] = userChoice;
      setWinnerC(userChoice);
      setCount((prev) => prev + 1);
    }

    setWinner && tieCheck(data);
    calculateWinner(data, winnerC);
    setTurns(true);
  };
  function won(winner, winnerC) {
    setLock(true);
    setWinner(true);
    if (winnerC == userChoice) {
      setpcscore((prev) => prev + 1);
      window.localStorage.setItem("pcscore", pcscore + 1);
    } else {
      sethscore((prev) => prev + 1);
      window.localStorage.setItem("hscore", hscore + 1);
    }
  }
  console.log(data);
  //checkwin
  function calculateWinner(data, winnerC) {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data, winnerC);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data, winnerC);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data, winnerC);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data, winnerC);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data, winnerC);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data, winnerC);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data, winnerC);
    } else if (data[2] === data[4] && data[2] === data[6] && data[6] !== "") {
      won(data, winnerC);
    }
  }

  const handleReset = () => {
    setshowQuit(!showQuit);
  };
  const handleWinner = () => {
    setWinner(!winner);
    setUserChoice(userChoice);
  };
  console.log(checktie);

  return (
    <section className="main-container">
      <div className="game-top-row">
        <div>
          <img src={x} alt="" />
          <img src={bwo} alt="" />
        </div>
        <div className="turn-btn">
          <img src={`/src/assets/${turn}` + `.png`} alt="" />
          Turn
        </div>
        <div className="retry" onClick={() => handleReset()}>
          <img src={retry} alt="" />
        </div>
      </div>
      <div
        className="box-container"
        style={{ textTransform: "capitalize", color: "blue" }}
      >
        <div className="box" id="0" onClick={(e) => handleClick(e, 0)}>
          {data[0] ? data[0] === "x" ? <img src={x} /> : data[0] : data[0]}
        </div>
        <div className="box" id="1" onClick={(e) => handleClick(e, 1)}>
          {data[1] ? data[1] == "x" ? <img src={x} /> : data[1] : data[1]}
        </div>
        <div className="box" id="2" onClick={(e) => handleClick(e, 2)}>
          {data[2] ? data[2] == "x" ? <img src={x} /> : data[2] : data[2]}
        </div>
        <div className="box" id="3" onClick={(e) => handleClick(e, 3)}>
          {data[3] ? data[3] == "x" ? <img src={x} /> : data[3] : data[3]}
        </div>
        <div className="box" id="4" onClick={(e) => handleClick(e, 4)}>
          {data[4] ? data[4] == "x" ? <img src={x} /> : data[4] : data[4]}
        </div>
        <div className="box" id="5" onClick={(e) => handleClick(e, 5)}>
          {data[5] ? data[5] == "x" ? <img src={x} /> : data[5] : data[5]}
        </div>
        <div className="box" id="6" onClick={(e) => handleClick(e, 6)}>
          {data[6] ? data[6] == "x" ? <img src={x} /> : data[6] : data[6]}
        </div>
        <div className="box" id="7" onClick={(e) => handleClick(e, 7)}>
          {data[7] ? data[7] == "x" ? <img src={x} /> : data[7] : data[7]}
        </div>
        <div className="box" id="8" onClick={(e) => handleClick(e, 8)}>
          {data[8] ? data[8] == "x" ? <img src={x} /> : data[8] : data[8]}
        </div>
      </div>
      <div className="score-container">
        <div className="score-card you ">
          {userChoice} (You) <p style={{ fontSize: "15px" }}>{hscore}</p>
        </div>
        <div className="score-card ties">
          Ties <p style={{ fontSize: "15px" }}>{tie}</p>
        </div>
        <div className="score-card cpu">
          {pcTurn} (CPU) <p style={{ fontSize: "15px" }}>{pcscore}</p>
        </div>
      </div>
      {showQuit && <Quit change={handleReset} userChoice={userChoice} data />}
      {winner && (
        <Winner
          change={handleWinner}
          userChoice={userChoice}
          winner={winnerC}
          data
        />
      )}
      {checktie && <Tie change={handleWinner} userChoice={userChoice} h p t />}
    </section>
  );
};

export default Play;
