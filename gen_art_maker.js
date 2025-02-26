import React, { useState, useEffect, useRef } from 'react';

const GenerativeArtCreator = () => {
  // Canvas state
  const canvasRef = useRef(null);
  const [canvasSize] = useState({ width: 600, height: 400 });
  
  // Parameter states
  const [parameters, setParameters] = useState({
    mode: 'flow',
    particleCount: 100,
    speed: 2,
    lineWidth: 1,
    colorMode: 'rainbow',
    complexity: 3,
    noiseScale: 0.005,
    decay: 0.97,
    symmetry: 1,
    rotationSpeed: 0.2,
    backgroundColor: '#000000',
    blendMode: 'source-over',
    turbulence: 0,
    attractorStrength: 0,
    trailStyle: 'line',
    particleShape: 'circle',
    gravitationalPull: 0,
    expansion: 0,
    pulseRate: 0
  });
  
  // Color presets
  const colorPresets = {
    rainbow: {
      colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.rainbow.colors.length);
        return colorPresets.rainbow.colors[i];
      }
    },
    sunset: {
      colors: ['#F15BB5', '#FF5C8D', '#FF9E78', '#FFEE65', '#9896F1'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.sunset.colors.length);
        return colorPresets.sunset.colors[i];
      }
    },
    ocean: {
      colors: ['#05445E', '#189AB4', '#75E6DA', '#D4F1F9', '#75E6DA', '#189AB4'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.ocean.colors.length);
        return colorPresets.ocean.colors[i];
      }
    },
    neon: {
      colors: ['#FF00FF', '#00FFFF', '#00FF00', '#FFFF00'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.neon.colors.length);
        return colorPresets.neon.colors[i];
      }
    },
    cyberpunk: {
      colors: ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#4361ee', '#4cc9f0'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.cyberpunk.colors.length);
        return colorPresets.cyberpunk.colors[i];
      }
    },
    fire: {
      colors: ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02', '#d00000', '#9d0208'],
      getColor: (t) => {
        const i = Math.floor(t % colorPresets.fire.colors.length);
        return colorPresets.fire.colors[i];
      }
    }
  };
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const attractor = useRef({ x: 300, y: 200 });
  
  // Preset configurations
  const presets = {
    neonGalaxy: {
      mode: 'orbit',
      particleCount: 150,
      speed: 1.5,
      lineWidth: 1.8,
      colorMode: 'neon',
      complexity: 3,
      noiseScale: 0.006,
      decay: 0.97,
      symmetry: 6,
      rotationSpeed: 0.3,
      backgroundColor: '#0a0a1f',
      blendMode: 'screen',
      turbulence: 0.3,
      attractorStrength: 0.2,
      trailStyle: 'pulse',
      particleShape: 'circle'
    },
    galaxySpiral: {
      mode: 'spiral',
      particleCount: 150,
      speed: 0.8,
      lineWidth: 1.2,
      colorMode: 'sunset',
      complexity: 3,
      noiseScale: 0.005,
      decay: 0.97,
      symmetry: 2,
      rotationSpeed: 0.3,
      backgroundColor: '#000005',
      blendMode: 'screen',
      turbulence: 0.2,
      attractorStrength: 0.1,
      trailStyle: 'ribbon',
      particleShape: 'circle',
      gravitationalPull: 0.05
    },
    explodingStars: {
      mode: 'explosion',
      particleCount: 200,
      speed: 2.5,
      lineWidth: 1,
      colorMode: 'neon',
      complexity: 1,
      noiseScale: 0.003,
      decay: 0.96,
      symmetry: 1,
      rotationSpeed: 0.1,
      backgroundColor: '#050505',
      blendMode: 'lighter',
      turbulence: 0.3,
      attractorStrength: 0,
      trailStyle: 'pulse',
      particleShape: 'circle',
      expansion: 0.2
    },
    quantumField: {
      mode: 'quantum',
      particleCount: 180,
      speed: 1.5,
      lineWidth: 0.9,
      colorMode: 'cyberpunk',
      complexity: 4,
      noiseScale: 0.007,
      decay: 0.975,
      symmetry: 4,
      rotationSpeed: 0.2,
      backgroundColor: '#020214',
      blendMode: 'screen',
      turbulence: 0.4,
      attractorStrength: 0.3,
      trailStyle: 'line',
      particleShape: 'square'
    }
  };
  
  // Generate initial particles
  useEffect(() => {
    initializeParticles();
  }, [parameters.particleCount, parameters.mode]);
  
  const initializeParticles = () => {
    const newParticles = [];
    
    for (let i = 0; i < parameters.particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * parameters.speed,
        speedY: (Math.random() - 0.5) * parameters.speed,
        color: Math.random() * 360,
        age: 0,
        life: Math.random() * 200 + 50,
        phase: Math.random() * Math.PI * 2,
        history: [],
        radius: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    setParticles(newParticles);
  };
  
  // Handle parameter change
  const handleParameterChange = (param, value) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };
  
  // Apply preset configuration
  const applyPreset = (presetName) => {
    if (presets[presetName]) {
      const completePreset = {
        ...parameters,
        ...presets[presetName]
      };
      setParameters(completePreset);
      setTimeout(initializeParticles, 50);
    }
  };
  
  // Generate random configuration
  const generateRandom = () => {
    const presetNames = Object.keys(presets);
    const randomPreset = presetNames[Math.floor(Math.random() * presetNames.length)];
    
    const basePreset = presets[randomPreset];
    
    const randomizedPreset = {
      ...parameters,
      ...basePreset,
      colorMode: Object.keys(colorPresets)[Math.floor(Math.random() * Object.keys(colorPresets).length)],
      symmetry: Math.floor(Math.random() * 8) + 1,
      rotationSpeed: Math.random() * 0.8,
      turbulence: Math.random() * 0.5,
      attractorStrength: Math.random() * 0.5
    };
    
    setParameters(randomizedPreset);
    setTimeout(initializeParticles, 50);
  };
  
  // Calculate perlin noise (simplified version)
  const noise = (x, y) => {
    return Math.sin(x * 0.5) * Math.cos(y * 0.4) + 
           Math.sin(x * 0.3 + y * 0.6) * Math.cos(x * 0.3 - y * 0.4);
  };
  
  // Handle mouse movement for attractor point
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      attractor.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isAnimating) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      frameCountRef.current += 1;
      
      // Handle background with decay
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(${parseInt(parameters.backgroundColor.slice(1, 3), 16)}, 
                             ${parseInt(parameters.backgroundColor.slice(3, 5), 16)}, 
                             ${parseInt(parameters.backgroundColor.slice(5, 7), 16)}, 
                             ${1 - parameters.decay + 0.01})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set blend mode for particles
      ctx.globalCompositeOperation = parameters.blendMode;
      
      const updatedParticles = particles.map(particle => {
        const p = { ...particle };
        
        // Keep track of history for trails
        if (parameters.trailStyle !== 'line') {
          if (p.history.length > 20) {
            p.history.shift();
          }
          p.history.push({ x: p.x, y: p.y });
        }
        
        // Different movement behaviors based on mode
        if (parameters.mode === 'flow') {
          // Add turbulence
          const turbFactor = parameters.turbulence * Math.sin(frameCountRef.current * 0.01 + p.phase);
          
          const angle = noise(p.x * parameters.noiseScale, p.y * parameters.noiseScale) * 
                       Math.PI * parameters.complexity + 
                       frameCountRef.current * 0.001 * parameters.rotationSpeed +
                       turbFactor;
          
          p.speedX = Math.cos(angle) * parameters.speed;
          p.speedY = Math.sin(angle) * parameters.speed;
          
          // Apply attractor influence
          if (parameters.attractorStrength > 0) {
            const dx = attractor.current.x - p.x;
            const dy = attractor.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
              p.speedX += (dx / dist) * parameters.attractorStrength;
              p.speedY += (dy / dist) * parameters.attractorStrength;
            }
          }
        } else if (parameters.mode === 'orbit') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Update angle based on rotation speed and distance
          p.angle += parameters.rotationSpeed * 0.02 * (p.radius > 0 ? 100 / p.radius : 0);
          
          // Add turbulence
          p.angle += parameters.turbulence * noise(p.x * 0.01, p.y * 0.01) * 0.1;
          
          // Calculate new position
          p.x = centerX + Math.cos(p.angle) * p.radius;
          p.y = centerY + Math.sin(p.angle) * p.radius;
          
          // Calculate speed for trail effect
          p.speedX = -Math.sin(p.angle) * parameters.speed * (p.radius / 100);
          p.speedY = Math.cos(p.angle) * parameters.speed * (p.radius / 100);
          
          // Apply attractor influence
          if (parameters.attractorStrength > 0) {
            const dx = attractor.current.x - centerX;
            const dy = attractor.current.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
              p.radius += parameters.attractorStrength * 0.1 * (dist - p.radius) / dist;
            }
          }
          
          // Apply gravitational pull to adjust radius over time
          if (parameters.gravitationalPull > 0) {
            p.radius -= parameters.gravitationalPull * 0.1;
            // Respawn particles that collapse to center
            if (p.radius < 10) {
              p.radius = Math.random() * 100 + 50;
              p.angle = Math.random() * Math.PI * 2;
            }
          }
        } else if (parameters.mode === 'spiral') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Spiral effect: radius constantly decreases while angle increases
          p.radius -= parameters.speed * 0.2;
          p.angle += parameters.rotationSpeed * 0.05 * (1 + (100 - p.radius) / 100);
          
          // Add turbulence
          p.angle += parameters.turbulence * noise(p.x * 0.01, p.y * 0.01) * 0.1;
          
          // Calculate new position
          p.x = centerX + Math.cos(p.angle) * p.radius;
          p.y = centerY + Math.sin(p.angle) * p.radius;
          
          // Calculate speed for trail effect
          p.speedX = -Math.sin(p.angle) * parameters.speed;
          p.speedY = Math.cos(p.angle) * parameters.speed;
          
          // Apply gravitational pull
          if (parameters.gravitationalPull > 0) {
            p.radius -= parameters.gravitationalPull * 0.2;
          }
          
          // Respawn particles that reach the center
          if (p.radius < 5) {
            p.radius = Math.random() * 100 + 50;
            p.angle = Math.random() * Math.PI * 2;
          }
        } else if (parameters.mode === 'explosion') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Calculate vector from center
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Normalize and apply speed outward
          if (dist > 0) {
            p.speedX = (dx / dist) * parameters.speed * (1 + parameters.expansion * 0.5);
            p.speedY = (dy / dist) * parameters.speed * (1 + parameters.expansion * 0.5);
          }
          
          // Add some chaotic motion
          p.speedX += (Math.random() - 0.5) * parameters.turbulence;
          p.speedY += (Math.random() - 0.5) * parameters.turbulence;
          
          // Reset particles that go too far from center
          if (dist > Math.max(canvas.width, canvas.height) * 0.7) {
            p.x = centerX + (Math.random() - 0.5) * 20;
            p.y = centerY + (Math.random() - 0.5) * 20;
            p.speedX = 0;
            p.speedY = 0;
          }
        } else if (parameters.mode === 'quantum') {
          // Quantum-like random jumps with flow field influence
          if (Math.random() < 0.02 * parameters.turbulence) {
            // Occasionally teleport to a nearby location
            p.x += (Math.random() - 0.5) * 50;
            p.y += (Math.random() - 0.5) * 50;
          }
          
          // Base movement on noise field
          const angle = noise(p.x * parameters.noiseScale, p.y * parameters.noiseScale) * 
                       Math.PI * parameters.complexity;
          
          // Probability-based speed changes
          if (Math.random() < 0.1) {
            p.speedX = Math.cos(angle) * parameters.speed * (Math.random() + 0.5);
            p.speedY = Math.sin(angle) * parameters.speed * (Math.random() + 0.5);
          } else {
            // Gradual movement towards the flow direction
            p.speedX += (Math.cos(angle) * parameters.speed - p.speedX) * 0.1;
            p.speedY += (Math.sin(angle) * parameters.speed - p.speedY) * 0.1;
          }
          
          // Apply attractor influence
          if (parameters.attractorStrength > 0) {
            const dx = attractor.current.x - p.x;
            const dy = attractor.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
              p.speedX += (dx / dist) * parameters.attractorStrength * (Math.random() + 0.5);
              p.speedY += (dy / dist) * parameters.attractorStrength * (Math.random() + 0.5);
            }
          }
        }
        
        // Update position for all modes except orbit and spiral (which update position directly)
        if (parameters.mode !== 'orbit' && parameters.mode !== 'spiral') {
          p.x += p.speedX;
          p.y += p.speedY;
        }
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Age the particle
        p.age += 1;
        
        return p;
      });
      
      // Draw particles
      updatedParticles.forEach(p => {
        // Get color from palette
        const colorObj = colorPresets[parameters.colorMode];
        const baseColor = colorObj.getColor(p.color);
        
        // Apply pulse effect to size/opacity
        let pulseFactor = 1;
        if (parameters.pulseRate > 0) {
          pulseFactor = 0.5 + Math.sin(frameCountRef.current * 0.05 + p.phase) * 0.5;
        }
        
        // Draw based on trail style
        ctx.lineWidth = parameters.lineWidth * pulseFactor;
        
        ctx.strokeStyle = baseColor;
        ctx.fillStyle = baseColor;
        
        if (parameters.trailStyle === 'line') {
          // Classic line style
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.speedX * 4, p.y - p.speedY * 4);
          ctx.stroke();
        } else if (parameters.trailStyle === 'pulse') {
          // Pulsing dots
          ctx.beginPath();
          ctx.arc(p.x, p.y, parameters.lineWidth * 2 * pulseFactor, 0, Math.PI * 2);
          ctx.fill();
        } else if (parameters.trailStyle === 'ribbon') {
          // Ribbon effect using history
          if (p.history.length > 2) {
            ctx.beginPath();
            ctx.moveTo(p.history[0].x, p.history[0].y);
            
            for (let i = 1; i < p.history.length; i++) {
              ctx.lineTo(p.history[i].x, p.history[i].y);
            }
            
            ctx.stroke();
          }
        } else if (parameters.trailStyle === 'branch') {
          // Branching effect
          if (p.history.length > 1) {
            const branchProb = 0.2;
            
            for (let i = 1; i < p.history.length; i++) {
              ctx.beginPath();
              ctx.moveTo(p.history[i-1].x, p.history[i-1].y);
              ctx.lineTo(p.history[i].x, p.history[i].y);
              ctx.stroke();
              
              // Random branches
              if (Math.random() < branchProb && i % 3 === 0) {
                const angle = Math.atan2(
                  p.history[i].y - p.history[i-1].y,
                  p.history[i].x - p.history[i-1].x
                ) + (Math.random() - 0.5) * Math.PI * 0.75;
                
                const length = parameters.lineWidth * 5;
                
                ctx.beginPath();
                ctx.moveTo(p.history[i].x, p.history[i].y);
                ctx.lineTo(
                  p.history[i].x + Math.cos(angle) * length,
                  p.history[i].y + Math.sin(angle) * length
                );
                ctx.stroke();
              }
            }
          }
        } else if (parameters.trailStyle === 'wave') {
          // Wave-like trail
          if (p.history.length > 2) {
            ctx.beginPath();
            ctx.moveTo(p.history[0].x, p.history[0].y);
            
            for (let i = 1; i < p.history.length; i++) {
              const waveOffset = Math.sin(i * 0.4 + frameCountRef.current * 0.1) * parameters.lineWidth * 3;
              const dx = p.history[i].x - p.history[i-1].x;
              const dy = p.history[i].y - p.history[i-1].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist > 0) {
                ctx.lineTo(
                  p.history[i].x + (dy / dist) * waveOffset,
                  p.history[i].y - (dx / dist) * waveOffset
                );
              } else {
                ctx.lineTo(p.history[i].x, p.history[i].y);
              }
            }
            
            ctx.stroke();
          }
        }
        
        // Draw particle shape at current position
        if (parameters.particleShape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, parameters.lineWidth * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (parameters.particleShape === 'square') {
          const size = parameters.lineWidth * 2.5;
          ctx.fillRect(p.x - size/2, p.y - size/2, size, size);
        } else if (parameters.particleShape === 'triangle') {
          const size = parameters.lineWidth * 3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - size);
          ctx.lineTo(p.x + size * 0.866, p.y + size * 0.5);
          ctx.lineTo(p.x - size * 0.866, p.y + size * 0.5);
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw symmetrical versions if symmetry > 1
        if (parameters.symmetry > 1) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          for (let i = 1; i < parameters.symmetry; i++) {
            const angle = (Math.PI * 2 / parameters.symmetry) * i;
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            
            const rotatedX = centerX + dx * Math.cos(angle) - dy * Math.sin(angle);
            const rotatedY = centerY + dx * Math.sin(angle) + dy * Math.cos(angle);
            
            const rotatedSpeedX = p.speedX * Math.cos(angle) - p.speedY * Math.sin(angle);
            const rotatedSpeedY = p.speedX * Math.sin(angle) + p.speedY * Math.cos(angle);
            
            // Draw symmetrical trail
            if (parameters.trailStyle === 'line') {
              ctx.beginPath();
              ctx.moveTo(rotatedX, rotatedY);
              ctx.lineTo(rotatedX - rotatedSpeedX * 4, rotatedY - rotatedSpeedY * 4);
              ctx.stroke();
            } else if (parameters.particleShape === 'circle') {
              ctx.beginPath();
              ctx.arc(rotatedX, rotatedY, parameters.lineWidth * 1.5, 0, Math.PI * 2);
              ctx.fill();
            } else if (parameters.particleShape === 'square') {
              const size = parameters.lineWidth * 2.5;
              ctx.fillRect(rotatedX - size/2, rotatedY - size/2, size, size);
            } else if (parameters.particleShape === 'triangle') {
              const size = parameters.lineWidth * 3;
              ctx.beginPath();
              ctx.moveTo(rotatedX, rotatedY - size);
              ctx.lineTo(rotatedX + size * 0.866, rotatedY + size * 0.5);
              ctx.lineTo(rotatedX - size * 0.866, rotatedY + size * 0.5);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      });
      
      setParticles(updatedParticles);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, parameters, isAnimating, canvasSize]);
  
  // Clear canvas and restart
  const handleReset = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = parameters.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      initializeParticles();
    }
  };
  
  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  // Save canvas as image
  const saveImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'generative-art.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="w-full md:w-3/4 bg-gray-900 rounded-lg p-4 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="border border-gray-700 rounded-lg shadow-lg"
        />
      </div>
      
      <div className="w-full md:w-1/4 bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-96 md:max-h-screen">
        <h2 className="text-xl font-bold text-white mb-4">Control Panel</h2>
        
        <div className="space-y-4">
          {/* Preset buttons */}
          <div>
            <label className="block text-gray-300 mb-2">Presets</label>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => applyPreset('neonGalaxy')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Neon Galaxy
              </button>
              <button 
                onClick={() => applyPreset('galaxySpiral')}
                className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded"
              >
                Galaxy Spiral
              </button>
              <button 
                onClick={() => applyPreset('explodingStars')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Exploding Stars
              </button>
              <button 
                onClick={() => applyPreset('quantumField')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Quantum Field
              </button>
              <button 
                onClick={generateRandom}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Random Style
              </button>
            </div>
          </div>
          
          {/* Mode selector */}
          <div>
            <label className="block text-gray-300 mb-1">Pattern Mode</label>
            <select 
              value={parameters.mode}
              onChange={(e) => handleParameterChange('mode', e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="flow">Flow Field</option>
              <option value="orbit">Orbital</option>
              <option value="spiral">Spiral</option>
              <option value="explosion">Explosion</option>
              <option value="quantum">Quantum Field</option>
            </select>
          </div>
          
          {/* Color selector */}
          <div>
            <label className="block text-gray-300 mb-1">Color Palette</label>
            <select 
              value={parameters.colorMode}
              onChange={(e) => handleParameterChange('colorMode', e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="rainbow">Rainbow</option>
              <option value="sunset">Sunset</option>
              <option value="ocean">Ocean</option>
              <option value="neon">Neon</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="fire">Fire</option>
            </select>
          </div>
          
          {/* Trail style */}
          <div>
            <label className="block text-gray-300 mb-1">Trail Style</label>
            <select 
              value={parameters.trailStyle}
              onChange={(e) => handleParameterChange('trailStyle', e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="line">Line</option>
              <option value="pulse">Pulse</option>
              <option value="ribbon">Ribbon</option>
              <option value="branch">Branch</option>
              <option value="wave">Wave</option>
            </select>
          </div>
          
          {/* Particle shape */}
          <div>
            <label className="block text-gray-300 mb-1">Particle Shape</label>
            <select 
              value={parameters.particleShape}
              onChange={(e) => handleParameterChange('particleShape', e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
          
          {/* Blend mode */}
          <div>
            <label className="block text-gray-300 mb-1">Blend Mode</label>
            <select 
              value={parameters.blendMode}
              onChange={(e) => handleParameterChange('blendMode', e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="source-over">Normal</option>
              <option value="screen">Screen</option>
              <option value="lighter">Lighter</option>
              <option value="multiply">Multiply</option>
              <option value="overlay">Overlay</option>
            </select>
          </div>
          
          {/* Background color */}
          <div>
            <label className="block text-gray-300 mb-1">Background</label>
            <input 
              type="color" 
              value={parameters.backgroundColor}
              onChange={(e) => handleParameterChange('backgroundColor', e.target.value)}
              className="w-full bg-gray-700 rounded h-8"
            />
          </div>
          
          {/* Particle count */}
          <div>
            <label className="block text-gray-300 mb-1">
              Particles: {parameters.particleCount}
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={parameters.particleCount}
              onChange={(e) => handleParameterChange('particleCount', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Speed */}
          <div>
            <label className="block text-gray-300 mb-1">
              Speed: {parameters.speed.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={parameters.speed}
              onChange={(e) => handleParameterChange('speed', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Line width */}
          <div>
            <label className="block text-gray-300 mb-1">
              Line Width: {parameters.lineWidth.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={parameters.lineWidth}
              onChange={(e) => handleParameterChange('lineWidth', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Complexity */}
          <div>
            <label className="block text-gray-300 mb-1">
              Pattern Complexity: {parameters.complexity.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="10" 
              step="0.5"
              value={parameters.complexity}
              onChange={(e) => handleParameterChange('complexity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Noise scale */}
          <div>
            <label className="block text-gray-300 mb-1">
              Detail: {(parameters.noiseScale * 1000).toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0.001" 
              max="0.02" 
              step="0.001"
              value={parameters.noiseScale}
              onChange={(e) => handleParameterChange('noiseScale', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Trail decay */}
          <div>
            <label className="block text-gray-300 mb-1">
              Trail Length: {(parameters.decay * 100).toFixed(0)}%
            </label>
            <input 
              type="range" 
              min="0.9" 
              max="0.999" 
              step="0.001"
              value={parameters.decay}
              onChange={(e) => handleParameterChange('decay', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Symmetry */}
          <div>
            <label className="block text-gray-300 mb-1">
              Symmetry: {parameters.symmetry}
            </label>
            <input 
              type="range" 
              min="1" 
              max="12" 
              step="1"
              value={parameters.symmetry}
              onChange={(e) => handleParameterChange('symmetry', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Rotation speed */}
          <div>
            <label className="block text-gray-300 mb-1">
              Rotation: {parameters.rotationSpeed.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={parameters.rotationSpeed}
              onChange={(e) => handleParameterChange('rotationSpeed', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Turbulence */}
          <div>
            <label className="block text-gray-300 mb-1">
              Turbulence: {parameters.turbulence.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={parameters.turbulence}
              onChange={(e) => handleParameterChange('turbulence', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Attractor Strength */}
          <div>
            <label className="block text-gray-300 mb-1">
              Mouse Influence: {parameters.attractorStrength.toFixed(1)}
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={parameters.attractorStrength}
              onChange={(e) => handleParameterChange('attractorStrength', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Gravitational Pull (conditionally shown) */}
          {['orbit', 'spiral'].includes(parameters.mode) && (
            <div>
              <label className="block text-gray-300 mb-1">
                Gravity: {parameters.gravitationalPull.toFixed(2)}
              </label>
              <input 
                type="range" 
                min="0" 
                max="0.5" 
                step="0.01"
                value={parameters.gravitationalPull}
                onChange={(e) => handleParameterChange('gravitationalPull', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}
          
          {/* Expansion (conditionally shown) */}
          {parameters.mode === 'explosion' && (
            <div>
              <label className="block text-gray-300 mb-1">
                Expansion: {parameters.expansion.toFixed(1)}
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={parameters.expansion}
                onChange={(e) => handleParameterChange('expansion', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}
          
          {/* Control buttons */}
          <div className="flex gap-2 pt-4">
            <button 
              onClick={toggleAnimation}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isAnimating ? 'Pause' : 'Play'}
            </button>
            <button 
              onClick={handleReset}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
          
          <button 
            onClick={saveImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerativeArtCreator;