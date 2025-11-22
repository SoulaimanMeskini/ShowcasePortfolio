import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FollowingEyes from './FollowingEyes';
import NavDraw from './navigation/NavDraw';
import { useLocation, Link } from 'react-router-dom';
import ClickMe from './svg/ClickMe';
import { useTheme } from './ThemeProvider';

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
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

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
      const savedDrawing = localStorage.getItem('savedDrawing');
      
      // Store old dimensions before resizing
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      // Set new dimensions
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      const renderCtx = canvas.getContext('2d');
      setContext(renderCtx);
      
      // Load saved drawing
      if (savedDrawing) {
        const img = new Image();
        img.src = savedDrawing;
        img.onload = () => {
          // If this is initial load (no old dimensions), draw at original size
          if (oldWidth === 0 || oldHeight === 0) {
            renderCtx.drawImage(img, 0, 0);
          } else {
            // Scale from old dimensions to new dimensions
            renderCtx.drawImage(img, 0, 0, oldWidth, oldHeight, 0, 0, newWidth, newHeight);
            // Save the resized version
            localStorage.setItem('savedDrawing', canvas.toDataURL());
          }
        };
      }
    }
  }, [canvasRef]);

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

    // Initialize canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      
      // Set drawing properties based on theme
      ctx.strokeStyle = theme === 'dark' ? 'white' : 'black';
      ctx.lineWidth = 2;
      
      // Load saved drawing
      loadDrawing(ctx);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, [resizeCanvas, loadDrawing, theme]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      };
    }
  };

  const startDrawing = (e) => {
    if (!enableDrawing || !context) return;
    const { x, y } = getCoordinates(e);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
    setShowText(false);
  };

  const draw = (e) => {
    if (!enableDrawing || !isDrawing || !context) return;
    if (e.cancelable) {
      e.preventDefault(); // Prevent scrolling while drawing on mobile
    }
    const { x, y } = getCoordinates(e);
    context.lineTo(x, y);
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

  const handleKeyDown = useCallback((e) => {
    if (enableDrawing && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      setShowKeyboardWarning(true);
      setTimeout(() => {
        setShowKeyboardWarning(false);
      }, 2000);
    }
  }, [enableDrawing]);

  useEffect(() => {
    if (context && enableDrawing) {
      const oldColor = context.strokeStyle;
      const newColor = theme === 'dark' ? 'white' : 'black';
      context.strokeStyle = newColor;
      context.lineWidth = 2;
      
      // If there's a saved drawing and color changed, redraw with new color
      const savedDrawing = localStorage.getItem('savedDrawing');
      if (savedDrawing && oldColor !== newColor) {
        const canvas = canvasRef.current;
        if (canvas) {
          // Clear canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          // Load the saved image
          const img = new Image();
          img.src = savedDrawing;
          img.onload = () => {
            // Draw the image
            context.drawImage(img, 0, 0);
            
            // If switching from dark to light (white to black), invert the colors
            if (oldColor === 'white' && newColor === 'black') {
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              
              // Invert the colors (white becomes black)
              for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) { // If pixel is not transparent
                  data[i] = 255 - data[i];     // R
                  data[i + 1] = 255 - data[i + 1]; // G
                  data[i + 2] = 255 - data[i + 2]; // B
                }
              }
              
              context.putImageData(imageData, 0, 0);
              saveDrawing(); // Save the inverted version
            } else if (oldColor === 'black' && newColor === 'white') {
              // If switching from light to dark (black to white), invert the colors
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              
              // Invert the colors (black becomes white)
              for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) { // If pixel is not transparent
                  data[i] = 255 - data[i];     // R
                  data[i + 1] = 255 - data[i + 1]; // G
                  data[i + 2] = 255 - data[i + 2]; // B
                }
              }
              
              context.putImageData(imageData, 0, 0);
              saveDrawing(); // Save the inverted version
            }
          };
        }
      }
    }
  }, [context, enableDrawing, theme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
    <div className="relative w-full h-full flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ transformOrigin: 'top left', zIndex: 10, touchAction: isMobile ? 'auto' : 'none' }}
        onMouseDown={enableDrawing && !isMobile ? startDrawing : null}
        onMouseUp={enableDrawing && !isMobile ? stopDrawing : null}
        onMouseMove={enableDrawing && !isMobile ? draw : null}
        onMouseOut={enableDrawing && !isMobile ? stopDrawing : null}
        onTouchStart={null}
        onTouchEnd={null}
        onTouchMove={null}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 20 }}>
        <FollowingEyes
          scalingFactor={paintingScalingFactor}
          upscale={getScalingValue()}
        />
      </div>
      {showKeyboardWarning && (
        <div className="absolute w-full text-center z-40">
          <div className="inline-block bg-red-600 text-white text-lg p-3 rounded-lg">
            Please use a mouse to draw on the screen
          </div>
        </div>
      )}
      {enableDrawing && !isMobile && (
        <NavDraw
          onPencilClick={() => {
            if (context) {
              context.strokeStyle = theme === 'dark' ? 'white' : 'black';
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
        <Link to="/draw" className="absolute inset-0 z-20 hidden md:block">
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
