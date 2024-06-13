import React, { useRef, useState, useEffect, useCallback } from 'react';
import FollowingEyes from './Eyes';
import NavDraw from './navigation/NavDraw';

const Draw = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [showText, setShowText] = useState(true);

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      localStorage.setItem('savedDrawing', canvas.toDataURL());
    }
  };

  const loadDrawing = (ctx) => {
    const savedDrawing = localStorage.getItem('savedDrawing');
    if (savedDrawing && ctx) {
      const img = new Image();
      img.src = savedDrawing;
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      };
    }
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const renderCtx = canvas.getContext('2d');
      setContext(renderCtx);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (context) {
      loadDrawing(context);
    }
  }, [context]);

  const startDrawing = ({ nativeEvent }) => {
    if (!context) return;
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setShowText(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !context) return;
    const { offsetX, offsetY } = nativeEvent;
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
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-20"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseOut={stopDrawing}
      />
      {showText && (
        <div className="absolute bottom-10 w-full text-center z-30">
          <h1 className="text-2xl text-[#1d1d1d] bg-[#f5f5f5] p-2 rounded">You can draw on the screen</h1>
        </div>
      )}
      <FollowingEyes className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-75 z-10 pointer-events-none" />
      <NavDraw
        onPencilClick={() => { if (context) { context.strokeStyle = 'black'; context.lineWidth = 2; }}}
        onResetClick={resetCanvas}
        className="z-30"
      />
    </div>
  );
};

export default Draw;
