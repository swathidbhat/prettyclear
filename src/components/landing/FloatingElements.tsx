const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] animate-float" />
      <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[150px] animate-float-slow" />
      
      {/* Geometric lines */}
      <div className="absolute top-20 right-1/4 w-px h-40 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent line-grow" />
      <div className="absolute top-1/3 left-[15%] w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-1/4 right-[20%] w-32 h-px bg-gradient-to-r from-primary/20 to-transparent" />
      
      {/* Rotating rings */}
      <div className="absolute top-32 right-[30%] w-24 h-24">
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border border-dashed border-primary/10 animate-spin-reverse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse-glow" />
        </div>
      </div>
      
      {/* Another rotating element */}
      <div className="absolute bottom-40 left-[25%] w-16 h-16">
        <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow" style={{ animationDuration: '30s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>
      </div>
      
      {/* Orbiting dot */}
      <div className="absolute top-1/2 right-1/4 w-1 h-1">
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-orbit" />
      </div>
      
      {/* Dots grid with staggered animation */}
      <div className="absolute top-1/3 right-16 grid grid-cols-4 gap-3 opacity-40">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 h-1 rounded-full bg-primary"
            style={{ 
              animation: `pulseGlow 3s ease-in-out ${i * 0.15}s infinite`,
              opacity: 0.3 + (i % 4) * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Beam lines */}
      <div className="absolute top-0 left-[40%] w-px h-32 bg-gradient-to-b from-primary/30 to-transparent animate-beam" />
      <div className="absolute top-0 left-[42%] w-px h-24 bg-gradient-to-b from-primary/20 to-transparent animate-beam" style={{ animationDelay: '1s' }} />
      
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-8 right-8 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/40 to-transparent" />
      </div>
      
      {/* Diagonal crossing line */}
      <div className="absolute top-0 left-1/3 w-px h-screen bg-gradient-to-b from-transparent via-border/20 to-transparent transform rotate-12 opacity-50" />
    </div>
  );
};

export default FloatingElements;
