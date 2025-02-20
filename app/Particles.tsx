import React, { useRef, useEffect } from "react";
const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    
    const setSize = () => { 
      if (!canvas) return;
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
    }
    setSize();
    window.addEventListener("resize", setSize);
    class Particle {
      x = Math.random() * (canvas?.width ?? window.innerWidth);
      y = Math.random() * (canvas?.height ?? window.innerHeight);
      vx = (Math.random()-0.5)*1.5;
      vy = (Math.random()-0.5)*1.5;
      r = 2+Math.random()*2;
      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }
    const particles: Particle[] = []; for(let i=0;i<200;i++) particles.push(new Particle);
    let raf: number;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      });
      let delta = Math.sin(performance.now() / 1000) + 0.7*Math.cos(100000+performance.now() / 1600); 
      let line_dist = canvas.width / 7;
      line_dist += (line_dist / 3 ) * delta;
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.hypot(dx, dy);
        if(dist < line_dist){
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist/line_dist})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => { 
      window.removeEventListener("resize", setSize); 
      cancelAnimationFrame(raf);
    }
  }, []);
  return <canvas 
    ref={canvasRef} 
    style={{ 
      display: "block", 
      background: "#111",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }} 
  />;
};
export default Particles;
