import React, { useContext, useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";

export interface ConfettiContextState {
  dropConfetti: () => void;
}

const ConfettiContext = React.createContext<ConfettiContextState | null>(null);

export const ConfettiProvider = ({ children = null as any }) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const confettiRef = useRef<confetti.CreateTypes>();

  const dropConfetti = useMemo(
    () => () => {
      if (confettiRef.current && canvasRef.current) {
        canvasRef.current.style.visibility = "visible";
        confettiRef
          .current({
            particleCount: 800,
            spread: 200,
            origin: { x: 0.5, y: 0.4 },
          })
          ?.finally(() => {
            if (canvasRef.current) {
              canvasRef.current.style.visibility = "hidden";
            }
          });
      }
    },
    []
  );

  useEffect(() => {
    if (canvasRef.current && !confettiRef.current) {
      canvasRef.current.style.visibility = "hidden";
      confettiRef.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
    }
  }, []);

  const canvasStyle: React.CSSProperties = {
    // width: '100%',
    // height: '100vh',
    // position: 'absolute',
    // zIndex: 1,
    // top: 500,
    // left: 0,
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "transparent",
    zIndex: 1,
  };

  return (
    <ConfettiContext.Provider value={{ dropConfetti }}>
      <canvas ref={canvasRef as any} style={canvasStyle} />
      {children}
    </ConfettiContext.Provider>
  );
};

export const Confetti = () => {
  const { dropConfetti } = useConfetti();

  useEffect(() => {
    dropConfetti();
  }, [dropConfetti]);

  return <></>;
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);
  return context as ConfettiContextState;
};
