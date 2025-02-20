import React from 'react';

const Welcome: React.FC<{ start: () => void, state: string }> = ({ start, state }) => {
  const isIdle = state === "idle";
  
  return (
    <div className="welcome-container" onClick={isIdle ? start : undefined}>
      <div className="welcome-frame">
        <h1>Welcome to PSBU Experience Center</h1>
        <p>Your personalized digital concierge is here to assist you. You can ask me any question.</p>
        {!isIdle && (
          <div className="status-text">
            {state === "connecting" && "Connecting..."}
            {state === "connected" && "Connected"}
            {state === "disconnected" && "Disconnected"}
            {state === "error" && "Error occurred"}
          </div>
        )}
      </div>
      <style>{`
        .welcome-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          text-align: center;
          color: white;
          width: 80%;
          max-width: 600px;
          cursor: ${isIdle ? 'pointer' : 'default'};
          transition: transform 0.2s ease;
        }

        .welcome-container:hover {
          transform: translate(-50%, -50%) ${isIdle ? 'scale(1.02)' : 'scale(1)'};
        }

        .welcome-frame {
          background: rgba(0, 0, 20, 0.6);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(100, 200, 255, 0.5);
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 
            0 0 20px rgba(100, 200, 255, 0.3),
            inset 0 0 20px rgba(100, 200, 255, 0.2);
          animation: glow 4s infinite alternate;
        }

        .welcome-frame h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 300;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
        }

        .welcome-frame p {
          font-size: 1.2rem;
          line-height: 1.6;
          opacity: 0.9;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .status-text {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: rgba(100, 200, 255, 0.8);
          font-weight: 500;
          letter-spacing: 1px;
          animation: pulse 2s infinite;
        }

        @keyframes glow {
          0% {
            box-shadow: 
              0 0 20px rgba(100, 200, 255, 0.3),
              inset 0 0 20px rgba(100, 200, 255, 0.2);
          }
          100% {
            box-shadow: 
              0 0 25px rgba(100, 200, 255, 0.4),
              inset 0 0 30px rgba(100, 200, 255, 0.3);
          }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        @media (max-width: 768px) {
          .welcome-frame h1 {
            font-size: 1.8rem;
          }
          .welcome-frame p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
