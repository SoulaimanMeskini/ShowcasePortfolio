import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FollowingEyes from './FollowingEyes';
import NavDraw from './navigation/NavDraw';
import { useLocation, Link } from 'react-router-dom';
import ClickMe from './svg/ClickMe';

const Draw = ({ enableDrawing = true, enableLink = false, clickMePosition = { top: '10%', left: '10%' } }) => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const [paintingScalingFactor, setPaintingScalingFactor] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [showText, setShowText] = useState(true);
  const [showKeyboardWarning, setShowKeyboardWarning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

      let isEmpty = true;
      for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i + 3] !== 0) { // Check if the alpha channel is not zero
          isEmpty = false;
          break;
        }
      }

      if (!isEmpty) {
        localStorage.setItem('savedDrawing', canvas.toDataURL());
      }
    }
  }, [canvasRef]);

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
  }, [loadDrawing, canvasRef]);

  useEffect(() => {
    const updateWidth = () => {
      if (canvasRef.current) {
        const rounded = (canvasRef.current.offsetWidth / 2100);
        const rounded2 = parseFloat(rounded.toFixed(2));
        setPaintingScalingFactor(rounded2);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

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

  const handleKeyDown = (e) => {
    if (enableDrawing && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      setShowKeyboardWarning(true);
      setTimeout(() => {
        setShowKeyboardWarning(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getScalingValue = () => {
    const isStored = localStorage.getItem('savedDrawing') ? true : false;
    if (location.pathname === '/draw') return 1;
    if (isStored) return 1;
    return 2;
  };

  const hoverVariants = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, transition: { duration: 0.5 } }
  };

  const clickMeStyle = {
    position: 'absolute',
    top: clickMePosition.top,
    left: clickMePosition.left,
    zIndex: 20,
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ transformOrigin: 'top left', zIndex: 10 }}
        onMouseDown={enableDrawing ? startDrawing : null}
        onMouseUp={enableDrawing ? stopDrawing : null}
        onMouseMove={enableDrawing ? draw : null}
        onMouseOut={enableDrawing ? stopDrawing : null}
      />
      <FollowingEyes
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 20 }}
        scalingFactor={paintingScalingFactor}
        upscale={getScalingValue()}
      />
      {showKeyboardWarning && (
        <div className="absolute w-full text-center z-40">
          <div className="inline-block bg-red-600 text-white text-lg p-3 rounded-lg">
            Please use a mouse to draw on the screen
          </div>
        </div>
      )}
      {enableDrawing && (
        <NavDraw
          onPencilClick={() => {
            if (context) {
              context.strokeStyle = 'black';
              context.lineWidth = 2;
            }
            setShowText(false); // Hide text when pencil button is clicked
          }}
          onResetClick={resetCanvas}
          showText={showText} // Pass showText state to NavDraw
          className="z-30"
        />
      )}
      {!enableDrawing && (
        <Link to="/draw" className="absolute inset-0 z-20">
          <motion.div
            className="text-lg font-bold text-[#1d1d1d] transform rotate-45"
            variants={hoverVariants}
            initial="hidden"
            animate={isHovered ? "visible" : (isVisible ? "visible" : "hidden")}
            style={clickMeStyle}
          >
            <ClickMe />
          </motion.div>
        </Link>
      )}
    </div>
  );
};

export default Draw;
