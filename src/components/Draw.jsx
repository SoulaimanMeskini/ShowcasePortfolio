import React, { useRef, useState, useEffect, useCallback } from 'react';
import FollowingEyes from './Eyes';
import NavDraw from './navigation/NavDraw';

const Draw = ({ enableDrawing = true, canvasScale = 1, eyesScale = 1 }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [showText, setShowText] = useState(true);

  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      localStorage.setItem('savedDrawing', canvas.toDataURL());
    }
  }, []);

  const loadDrawing = useCallback((ctx) => {
    const savedDrawing = localStorage.getItem('savedDrawing');
    if (savedDrawing && ctx) {
      const img = new Image();
      img.src = savedDrawing;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const renderCtx = canvas.getContext('2d');
      setContext(renderCtx);
      loadDrawing(renderCtx);
    }
  }, [loadDrawing]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const startDrawing = (e) => {
    if (!enableDrawing || !context) return;
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setShowText(false);
  };

  const draw = (e) => {
    if (!enableDrawing || !isDrawing || !context) return;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
    saveDrawing();
  };

  const stopDrawing = () => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
    saveDrawing();
  };

  const resetCanvas = () => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      localStorage.removeItem('savedDrawing');
      setShowText(true);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full" style={{ transform: `scale(${canvasScale})`, transformOrigin: 'top left' }}>
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            className={`absolute top-0 left-0 w-full h-full ${!enableDrawing ? 'pointer-events-none' : ''}`}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseOut={stopDrawing}
            style={{ zIndex: 10 }}
          />
          <FollowingEyes className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none`} style={{ transform: `scale(${eyesScale})`, zIndex: 20 }} />
        </div>
      </div>
      {showText && enableDrawing && (
        <div className="absolute bottom-10 w-full text-center z-30">
          <h1 className="text-2xl text-[#1d1d1d] bg-[#f5f5f5] p-2 rounded">
            You can draw on the screen
          </h1>
        </div>
      )}
      {enableDrawing && (
        <NavDraw
          onPencilClick={() => {
            if (context) {
              context.strokeStyle = 'black';
              context.lineWidth = 2;
            }
          }}
          onResetClick={resetCanvas}
          className="z-30"
        />
      )}
    </div>
  );
};

export default Draw;
