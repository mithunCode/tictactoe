import { useState } from "react";
import circleContainer from "../assets/circleContent.png";

import axios from "axios";
const QuoteGenerator = () => {
  const [quoteId, setquoteId] = useState(Number(1));
  const [quote, setQuote] = useState("Always Smile");

  setInterval(() => {
    axios
      .get(`https://api.adviceslip.com/advice`)
      .then((data) => {
        setQuote(data.data.slip.advice);
        setquoteId((prev) => prev + 1);
      })
      .catch((error) => console.error(error));
  }, 61000);

  return (
    <section className="quoteContainer">
      <p className="quoteHead">Quote #{quoteId}</p>
      <p className="quote">
        &quot;
        {quote}&quot;
      </p>
      <div>
        <div className="quoteIcon">
          <img src={circleContainer} alt="circle" />
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
