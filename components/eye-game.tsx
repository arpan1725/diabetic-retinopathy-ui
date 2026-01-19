"use client";


import { useEffect, useState } from "react";
import Eye3DIcon from "./Eye-3d-icon";


export default function EyeGame() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setPos({
        x: Math.random() * 180,
        y: Math.random() * 100,
      });
    }, 800);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <>
      {/* icon */}
      <div className="eye-game-box">
  👁️
  <h3>Eye Health Game</h3>
  <p>Test your focus & get a score</p>
  <button onClick={() => setOpen(true)}>Play Now</button>
</div>


      {/* Modal Game */}
      {open && (
        <div className="game-modal">
          <div className="game-content">
            <h2>Eye Focus Game</h2>
            <p>Click the moving dot</p>

            <div
              className="dot"
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
              onClick={() => setScore(score + 1)}
            />

            <p>Score: {score}</p>

            <button
              onClick={() => {
                setOpen(false);
                setScore(0);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
