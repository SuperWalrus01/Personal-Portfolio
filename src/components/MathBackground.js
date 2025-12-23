import React, { useEffect, useRef } from 'react';
import './MathBackground.css';

function MathBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Math distributions data
    const distributions = [];
    
    // Create normal distribution curves
    for (let i = 0; i < 3; i++) {
      distributions.push({
        type: 'normal',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        mean: 0,
        stdDev: 1,
        scale: 50 + Math.random() * 50,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1
      });
    }

    // Animation
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      distributions.forEach(dist => {
        // Move the distribution
        dist.x += dist.speed;
        if (dist.x > canvas.width + 200) {
          dist.x = -200;
          dist.y = Math.random() * canvas.height;
        }

        // Draw normal distribution curve
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${dist.opacity})`;
        ctx.lineWidth = 2;

        const points = 100;
        const range = 6; // -3 to +3 standard deviations

        for (let i = 0; i < points; i++) {
          const t = (i / points) * range - range / 2;
          const x = dist.x + t * dist.scale;
          const y = dist.y - Math.exp(-(t * t) / 2) * dist.scale * 0.8;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Draw dots along the curve
        for (let i = 0; i < points; i += 5) {
          const t = (i / points) * range - range / 2;
          const x = dist.x + t * dist.scale;
          const y = dist.y - Math.exp(-(t * t) / 2) * dist.scale * 0.8;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${dist.opacity * 1.5})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="math-background" />;
}

export default MathBackground;
