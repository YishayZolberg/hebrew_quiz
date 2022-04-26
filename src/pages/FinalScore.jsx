import React from "react";

function FinalScore({ score, number }) {
  return (
    <div className="score-section">
      הציון שלך הוא {score} מתוך {number}
    </div>
  );
}

export default FinalScore;
